import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { logout } from '../features/Login/loginSlice';
import axios from 'axios';
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.currentUser);

    const toggleMenu = () => setMenuOpen(!menuOpen);

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

    return (
        <header className='w-full bg-gradient-to-r from-gray-900 to-black text-white font-sans font-bold p-4 shadow-lg'>
            <div className='flex items-center justify-between h-16 max-w-7xl mx-auto px-4'>
                <a href="/" className='text-3xl font-extrabold tracking-wide text-indigo-400'>THE_RANKERS</a>

                {/* Mobile Menu Toggle */}
                <button className='md:hidden text-3xl text-indigo-400' onClick={toggleMenu}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Navigation Links */}
                <nav className={`md:flex md:items-center md:space-x-8 text-lg absolute md:static left-0 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all ${menuOpen ? 'top-16' : 'hidden'} md:flex md:top-auto md:relative md:flex-row flex flex-col items-center z-10` }>
                    <a href="/" className='block px-4 py-2 md:inline hover:text-indigo-400 transition'>HOME</a>
                    <a href="/about" className='block px-4 py-2 md:inline hover:text-indigo-400 transition'>ABOUT</a>
                    <a href="/contact" className='block px-4 py-2 md:inline hover:text-indigo-400 transition'>CONTACT</a>
                    <a href="/leaderboard" className='block px-4 py-2 md:inline hover:text-indigo-400 transition'>LEADERBOARD</a>
                </nav>

                {/* Authentication Buttons */}
                <div className='flex items-center space-x-4'>
                    {user && (
                        <img
                            src={user.avatar_url}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full border-2 border-indigo-400 shadow-md cursor-pointer"
                        />
                    )}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="hidden md:block py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-semibold transition shadow-md"
                        >
                            Logout
                        </button>
                    )}
                    {!user && (
                        <button
                            onClick={handleLogin}
                            className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold transition shadow-md"
                        >
                            Sign in with GitHub
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
