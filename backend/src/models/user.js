import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    githubId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatar_url:{
        type: String,
        required: true,
    },
    repos:{
        type: Array,
    },
    total_commit:{
        type: Number,
    }
});

const User = mongoose.model("User", userSchema);
export default User;