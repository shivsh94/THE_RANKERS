import User from "../models/user.js";
import LeaderBoard from "../models/leaderBoard.js";
import { Octokit } from "@octokit/rest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getLeaderBoard = async (req, res) => {
  try {
    const token = req.cookies.token || req.body.token;
    // console.log("Token", token);

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const data = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("Data", data);
    const user = await User.findOne({ githubId: data.id });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const github_token = data.github_token;
    const repos = user.repos;

    const octokit = new Octokit({
      auth: github_token,
    });

    let existingLeader = await LeaderBoard.findOne({
      github_Id: user.githubId,
    });
    // const username = user.username;

    
    const TotalCommit = await getTotalCommits(octokit, user.repos.login, repos);

    // const TopRanker = await getTopRanker();
    
    if (!existingLeader) {
      existingLeader = new LeaderBoard({
        total_commit: TotalCommit,
        github_Id: user.githubId,
        username: user.username,
        // ranker: TopRanker,
      });
      await existingLeader.save();
    } else {
      // Update existing leaderboard data
      existingLeader.total_commit = TotalCommit;
      await existingLeader.save();
    }
    return res.status(200).json({success:true, message: "success", data: existingLeader });
  } catch (error) {
    console.error("LeaderBoard Error:", error);
    return res.status(500).json({success:false ,error: "LeaderBoard failed" });
  }
};

const getTotalCommits = async (octokit, username, repos) => {
    let totalCommits = 0;

    for (const repo of repos) {
        const repoName = repo.name;
        const owner = repo.owner.login;

        try {
            const { data: commits } = await octokit.rest.repos.listCommits({
                owner,
                repo: repoName,
                author: username,
                per_page: 100,
            });

            totalCommits += commits.length;
        } catch (error) {
            if (error.status === 403) {
                console.error("GitHub API rate limit exceeded. Try again later.");
                throw new Error("GitHub API rate limit exceeded");
            } else if (error.status === 409) {
                continue; 
            }

            console.error(`Error fetching commits for ${repoName}:`, error);
        }
    }

    return totalCommits;
};



export const leaderBoard = async (req, res) => {
  try{
    const leader = await LeaderBoard.find().sort({ total_commit: -1 });
    return res.status(200).json({ success: true, leader });
  }catch(error){
    console.error("Error fetching leaderBoard:", error);
    return res.status(500).json({success:false ,error: "Failed to load leaderBoard."});
  }
};