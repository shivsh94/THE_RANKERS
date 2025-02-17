import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { logout } from '../features/Login/loginSlice';
import axios from 'axios';
import { FiMenu, FiX, FiHome, FiInfo, FiMail, FiAward, FiGithub } from "react-icons/fi";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.currentUser);
    
    const menuRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_URI}/auth/github`;
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/auth/logout');

            if (response.data.success) {
                dispatch(logout());
                toast.success("Logged out successfully!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && menuOpen) {
                setMenuOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && dropdownOpen) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen, dropdownOpen]);

    const isActive = (path) => location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400' : '';

    const navItems = [
        { path: '/', label: 'HOME', icon: <FiHome className="mr-2" /> },
        { path: '/about', label: 'ABOUT', icon: <FiInfo className="mr-2" /> },
        { path: '/contact', label: 'CONTACT', icon: <FiMail className="mr-2" /> },
        { path: '/leaderboard', label: 'LEADERBOARD', icon: <FiAward className="mr-2" /> },
    ];

    return (
        <header className='w-full bg-black/95 backdrop-blur-md text-white font-sans sticky top-0 z-50 border-b border-gray-800'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between h-16 px-4 md:px-6'>
                    <button className='md:hidden text-2xl text-blue-400 transition-all duration-300 ease-in-out' 
                            onClick={toggleMenu}>
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>

                    <a href="/" className='text-2xl md:text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>
                        THE_RANKERS
                    </a>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center space-x-8'>
                        {navItems.map((item) => (
                            <a key={item.path} 
                               href={item.path} 
                               className={`flex items-center px-3 py-2 hover:text-blue-400 transition-all duration-200 ${isActive(item.path)}`}>
                                {item.icon}
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className='flex items-center space-x-4'>
                        {!user && (
                            <button
                                onClick={handleLogin}
                                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
                            >
                                <FiGithub className="mr-2" />
                                Sign in
                            </button>
                        )}
                        
                        {user && (
                            <div className="relative">
                                <img
                                    src={user.avatar_url}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-105 transition-transform duration-200"
                                    onClick={toggleDropdown}
                                />
                                
                                {dropdownOpen && (
                                    <div ref={dropdownRef} 
                                         className='absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 shadow-lg rounded-lg overflow-hidden'>
                                        <a href="/profile" 
                                           className='flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200'>
                                            Profile
                                        </a>
                                        <button onClick={handleLogout} 
                                                className='w-full flex items-center px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200'>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden bg-gray-900`}>
                    <nav ref={menuRef} className='flex flex-col space-y-2 p-4'>
                        {navItems.map((item) => (
                            <a key={item.path} 
                               href={item.path} 
                               className={`flex items-center px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 ${isActive(item.path)}`}>
                                {item.icon}
                                {item.label}
                            </a>
                        ))}
                        {!user && (
                            <button
                                onClick={handleLogin}
                                className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
                            >
                                <FiGithub className="mr-2" />
                                Sign in with GitHub
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;