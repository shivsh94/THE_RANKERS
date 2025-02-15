import React from "react";
import { Star, GitFork, Eye, Link, Code, Calendar } from "lucide-react";

const Card = ({ repo }) => {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg max-w-md w-full border border-gray-700">
      <div className="flex items-center mb-3">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="w-10 h-10 rounded-full mr-3 border border-gray-600"
        />
        <h2 className="text-2xl font-bold">{repo.name}</h2>
      </div>

      <p className="text-gray-300 text-sm mb-3">
        {repo.description || "No description available."}
      </p>

      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
        {repo.language && (
          <span className="flex items-center">
            <Code className="w-4 h-4 mr-1" /> {repo.language}
          </span>
        )}
      </div>

      <div className="flex justify-between text-gray-400 text-sm mb-3">
        <span className="flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-400" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center">
          <GitFork className="w-4 h-4 mr-1 text-blue-400" /> {repo.forks}
        </span>
        <span className="flex items-center">
          <Eye className="w-4 h-4 mr-1 text-green-400" /> {repo.watchers_count}
        </span>
      </div>

      <div className="text-xs text-gray-400 mb-4">
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" /> Created: {" "}
          {new Date(repo.created_at).toDateString()}
        </span>
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" /> Updated: {" "}
          {new Date(repo.updated_at).toDateString()}
        </span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold flex items-center justify-center"
      >
        <Link className="w-4 h-4 mr-2" />
        Visit Repository
      </a>
    </div>
  );
};

export default Card;
