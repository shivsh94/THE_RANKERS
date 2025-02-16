import User from "../models/user.js";
import { Octokit } from "@octokit/rest";
import { createOAuthAppAuth } from "@octokit/auth-oauth-app";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const SECRET_KEY = process.env.SECRET_KEY;

// Redirect to GitHub OAuth
export const githubAuth = (req, res) => {
  const githubURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email,repo`;
  res.redirect(githubURL);
};

// GitHub OAuth Callback
export const githubCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Authorization failed" });

  try {
    // Authenticate using Octokit OAuth
    const auth = createOAuthAppAuth({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });

 
    const tokenAuth = await auth({ type: "oauth-user", code });
    const accessToken = tokenAuth.token;
    // console.log("Access-token",accessToken);

    if (!accessToken) {
      return res.status(400).json({ error: "Access token not received" });
    }

    const octokit = new Octokit({ auth: accessToken });
    // console.log("Octokit",octokit);

    const { data: user } = await octokit.rest.users.getAuthenticated();
    // console.log("User",user.login);

    // Check if user exists in the database
    let existingUser = await User.findOne({ githubId: user.id });
    // console.log("Existing User",existingUser);

    if (!existingUser) {
      // Fetch user repositories

      let allRepos = [];
      let page = 1;
      while (true) {
        const { data: repos } =
          await octokit.rest.repos.listForAuthenticatedUser({
            visibility: "all",
            per_page: 100,
            page: page,
          });

        if (repos.length === 0) break;
        allRepos = allRepos.concat(repos);
        page++;
      }
      // console.log("Repos",repos);

      // const totalCommits = await getTotalCommits(octokit, user.login, allRepos);
       
      existingUser = new User({
        githubId: user.id,
        name: user.name,
        username: user.login,
        avatar_url: user.avatar_url,
        repos: allRepos,
        // total_commit: totalCommits,
      });

      await existingUser.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser.githubId, github_token: accessToken }, SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log("Token",token);
    

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.redirect(`${CLIENT_URL}/?token=${token}`);
  } catch (error) {
    console.error("GitHub Auth Error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Verify User Token
export const isVerify = async (req, res) => {
  try {
    const token = req.cookies.token || req.body.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const data = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ githubId: data.id });
    // console.log("User", user);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    return res.json({ success: true, message: "User authenticated", user });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// Logout User
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, message: "Logged out successfully!" });
};

// const getTotalCommits = async (octokit, username, repos) => {
//   let totalCommits = 0;

//   for (const repo of repos) {
//     const repoName = repo.name;
//     const owner = repo.owner.login;

//     try {
//       // Fetch commits where user is the author
//       const { data: commits } = await octokit.rest.repos.listCommits({
//         owner,
//         repo: repoName,
//         author: username, // Filter by user
//         per_page: 100,
//       });

//       totalCommits += commits.length;
//     } catch (error) {
//       console.error(`Error fetching commits for ${repoName}:`, error);
//     }
//   }

//   // console.log(`Total commits by ${username}:`, totalCommits);
//   return totalCommits;
// };
