import mongoose from "mongoose";

const leaderBoardSchema = new mongoose.Schema({
    github_Id: {
        type: String,
        required: true,
        unique: true,
    },

    total_commit: {
        type: Number,
        // required: true,
    },
    // ranker: {
    //     type: Array,
    //     default: 0,
    // },

});

const LeaderBoard = mongoose.model("LeaderBoard", leaderBoardSchema);
export default LeaderBoard;