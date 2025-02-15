import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
// import axios from "axios";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const user = useSelector((state) => state.login.currentUser);
  // console.log("User",user);
  
  // const repos = user.repos;
  // console.log("Repos",repos);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (!user || !user.githubId) return;

        const repos = user.repos;
        // console.log("Repo Response:", repos);
        setRepos(repos);
         
      } catch (error) {
        console.error("Repo Fetch Error:", error);
      }
    };

    fetchRepos();
  }, [user]);

  return (
    <div className="p-5 bg-black">
      {/* Heading */}
      <div className="text-center font-bold text-2xl mb-5">
        <h1>Your Repositories</h1>
      </div>

      {/* Display Repos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.length > 0 ? (
          repos.map((repo, index) => <Card key={index} repo={repo} />)
        ) : (
          <p className="text-gray-400 text-center col-span-3">
            No repositories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
