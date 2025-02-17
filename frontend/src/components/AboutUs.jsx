import React from "react";
import { Code2 } from 'lucide-react';
import { FiAward, FiCode, FiGithub, FiLayers, FiTrendingUp, FiUsers } from "react-icons/fi";

const AboutUs = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-12 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="w-12 h-12 text-blue-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              About Us
            </h1>
          </div>
          <p className="text-gray-400 text-center text-sm md:text-base max-w-2xl mx-auto">
            Learn about our mission and the team behind the platform
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-16 backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Founded in 2025, our platform was born from a simple idea: to make GitHub repository management more intuitive and insightful for developers of all experience levels.
            </p>
            <p>
              What started as a weekend project to solve our own pain points quickly evolved into a comprehensive solution that developers around the world now rely on. We understand the challenges of modern software development and are committed to providing tools that enhance productivity and collaboration.
            </p>
            <p>
              Today, we're proud to serve thousands of developers and teams, helping them gain deeper insights into their repositories and streamline their workflows.
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:translate-y-1">
              <div className="flex items-center mb-4">
                <FiCode className="text-blue-500 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-100 ml-3">Simplify Development</h3>
              </div>
              <p className="text-gray-400">
                We're dedicated to making repository management seamless and intuitive, allowing developers to focus on what they do best: writing great code.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-y-1">
              <div className="flex items-center mb-4">
                <FiTrendingUp className="text-purple-500 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-100 ml-3">Foster Growth</h3>
              </div>
              <p className="text-gray-400">
                We provide meaningful insights that help developers and teams understand their progress, identify areas for improvement, and celebrate their achievements.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:translate-y-1">
              <div className="flex items-center mb-4">
                <FiUsers className="text-green-500 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-100 ml-3">Build Community</h3>
              </div>
              <p className="text-gray-400">
                We believe in the power of open source and aim to foster a collaborative environment where developers can connect, share knowledge, and grow together.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:transform hover:translate-y-1"
              >
                <div className="mb-4 relative mx-auto w-24 h-24 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FiGithub className="mr-2" />
                  GitHub Profile
                </a>
              </div>
            ))}
          </div>
        </div> */}

        {/* Stats Section */}
        <div className="mb-16 backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">5+</div>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <p className="text-gray-400">Repositories Tracked</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">1+</div>
              <p className="text-gray-400">Countries Reached</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 flex">
              <div className="flex-shrink-0 mr-4">
                <FiLayers className="text-blue-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Transparency</h3>
                <p className="text-gray-400">
                  We believe in open communication and honest practices, both in our platform and in how we operate as a company.
                </p>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700/50 p-6 flex">
              <div className="flex-shrink-0 mr-4">
                <FiAward className="text-purple-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Excellence</h3>
                <p className="text-gray-400">
                  We strive for quality in everything we do, from code to customer service, always looking for ways to improve and innovate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;