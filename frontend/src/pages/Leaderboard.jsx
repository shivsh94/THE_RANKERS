import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Trophy, Medal } from 'lucide-react';

const Leaderboard = () => {
  const [leader, setLeader] = useState([]);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await axios.get("/auth/leaderboard");
        
        if (response.data.success) {
          setLeader(Array.isArray(response.data.leader) ? response.data.leader : []);
        } else {
          setLeader([]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        toast.error("Failed to load leaderboard.");
        setLeader([]);
      }
    };
    fetchLeader();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-4">
      {/* Leaderboard Title */}
      <div className="flex items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-[montserrat] tracking-wide text-center">
          Leaderboard
        </h1>
      </div>

      {/* Top 3 Highlight Section */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        {leader.length > 0 && (
          <div className="relative">
            {/* First Place - Elevated */}
            {leader[0] && (
              <div className="w-full flex justify-center mb-8">
                <div className="w-full max-w-sm bg-gradient-to-b from-yellow-500/10 to-gray-800/50 rounded-lg p-8 backdrop-blur-sm border border-yellow-500/30 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="flex flex-col items-center space-y-4">
                    <Trophy className="w-16 h-16 text-yellow-400" />
                    <div className="text-yellow-400 font-bold text-xl">1st Place</div>
                    <a
                      href={`https://github.com/${leader[0].username}`}
                      target="_blank"
                      className="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {leader[0].username}
                    </a>
                    <div className="text-5xl font-bold text-white">
                      {leader[0].total_commit}
                    </div>
                    <div className="text-sm text-gray-400">commits</div>
                  </div>
                </div>
              </div>
            )}

            {/* Second and Third Place - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Second Place */}
              {leader[1] && (
                <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex flex-col items-center space-y-4">
                    <Medal className="w-12 h-12 text-gray-400" />
                    <div className="text-gray-400 font-bold">2nd Place</div>
                    <a
                      href={`https://github.com/${leader[1].username}`}
                      target="_blank"
                      className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {leader[1].username}
                    </a>
                    <div className="text-4xl font-bold text-white">
                      {leader[1].total_commit}
                    </div>
                    <div className="text-sm text-gray-400">commits</div>
                  </div>
                </div>
              )}

              {/* Third Place */}
              {leader[2] && (
                <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex flex-col items-center space-y-4">
                    <Medal className="w-12 h-12 text-amber-600" />
                    <div className="text-amber-600 font-bold">3rd Place</div>
                    <a
                      href={`https://github.com/${leader[2].username}`}
                      target="_blank"
                      className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {leader[2].username}
                    </a>
                    <div className="text-4xl font-bold text-white">
                      {leader[2].total_commit}
                    </div>
                    <div className="text-sm text-gray-400">commits</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Rank Table */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Username</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Commits</th>
                </tr>
              </thead>
              <tbody>
                {leader.slice(3).map((user, ind) => (
                  <tr
                    key={ind}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-400">{ind + 4}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://github.com/${user.username}`}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {user.username}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right text-white">
                      {user.total_commit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;