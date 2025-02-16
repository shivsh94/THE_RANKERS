import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";



const Leaderboard = () => {
    const [leader, setLeader] = useState([]);

    useEffect(() => {
        const fetchLeader = async () => {
            try {
                const response = await axios.get("/auth/leaderboard");
                // console.log("Leaderboard Response:", response.data);

                if (response.data.success) {
                setLeader(Array.isArray(response.data.leader) ? response.data.leader : []);
                }
                else {
                    setLeader([]);
                }

            
            } catch (error) {
                console.error("Error fetching comments:", error);
                toast.error("Failed to load comments.");
                setComments([]);
                
            }
        }
        fetchLeader();
    }, []);

    return (
        <div className="w-full h-full bg-black">
            {/* Leaderboard Title */}
            <div className="flex items-center justify-center h-20">
                <h1 className="text-white text-3xl font-bold font-[montserrat] tracking-wide leading-6 text-center">
                    Leaderboard
                </h1>
            </div>

            {/* Top 3 Highlight Section */}
            <div className="w-full h-fit flex flex-col items-center justify-center">
                <div className="w-70 h-50 flex items-center justify-center m-5 border-2 border-green-950">

                </div>
                <div className="w-full flex items-center justify-evenly">
                    <div className="w-60 h-50 border-2 border-green-950"></div>
                    <div className="w-60 h-50 border-2 border-green-950"></div>
                </div>
            </div>

            {/* Rank Table */}
            <div className="h-full flex justify-around mt-20">
                <div className="overflow-x-auto w-full bg-black rounded-lg shadow-lg pr-20 pl-20">
                    <table className="min-w-full shadow-md rounded-lg border-collapse">
                        <thead>
                            <tr className="bg-black text-white opacity-50 font-mono border-b-1 border-blue-700/20 ">
                                <th className=" py-2 px-4">Rank</th>
                                <th className=" py-2 px-4">Username</th>
                                <th className="py-2 px-4">Commits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leader.map((user,ind) => (
                                <tr key={ind} className="text-center bg-black text-white">
                                    <td className="py-2 px-4 border-b-1 border-blue-700/30">{ind+1}</td>
                                    <td className="py-2 px-4 border-b-1 border-blue-700/30"><a href={`https://github.com/${user.username}`} target="_blank">{user.username}</a></td>
                                    <td className="py-2 px-4 border-b-1 border-blue-700/30">{user.total_commit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Leaderboard;
