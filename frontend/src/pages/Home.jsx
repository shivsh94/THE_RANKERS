import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import GitHubLogin from "../components/GitHubLogin";
import axios from "axios";
import { Code2 } from 'lucide-react';

const Home = () => {
  const [repos, setRepos] = useState([]);
  const user = useSelector((state) => state.login.currentUser);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (!user || !user.githubId) return;
        
        const repos = user.repos;
        setRepos(repos);
      } catch (error) {
        console.error("Repo Fetch Error:", error);
      }
    };
    
    fetchRepos();
  }, [user]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        await axios.get("/auth/getleaderboard");
      } catch (error) {
        console.error("Leaderboard Fetch Error:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-12 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="w-12 h-12 text-blue-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Your Repositories
            </h1>
          </div>
          <p className="text-gray-400 text-center text-sm md:text-base max-w-2xl mx-auto">
            Explore and manage your GitHub repositories with enhanced visibility and tracking
          </p>
        </div>

        {/* GitHub Login Section */}
        <div className="mb-12">
          <div className="max-w-md mx-auto backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6">
            <GitHubLogin />
          </div>
        </div>

        {/* Repositories Grid */}
        {repos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {repos.map((repo, index) => (
              <div 
                key={index}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Card repo={repo} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50">
            <Code2 className="w-16 h-16 text-gray-500 mb-4" />
            <p className="text-gray-400 text-center text-lg mb-2">
              No repositories found
            </p>
            <p className="text-gray-500 text-center text-sm max-w-md">
              Connect your GitHub account to see your repositories here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;