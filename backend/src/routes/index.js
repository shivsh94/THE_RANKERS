import express from "express";
import { githubAuth, githubCallback,isVerify,logout } from "../contorller/userController.js";
// import  {getLeaderBoard} from "../contorller/LeaderBoard.js";

const router = express.Router();

router.get("/auth/github", githubAuth);
router.get("/auth/github/callback", githubCallback);
router.get("/auth/verify",isVerify);
router.get("/auth/logout",logout);
// router.get("/auth/repo/:githubId",repo);
// router.get("/auth/leaderboard",getLeaderBoard);

export default router;
