import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { logout } from '../features/Login/loginSlice';
import axios from 'axios';

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.currentUser);

    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/github";
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/auth/logout');

            if (response.data.success) {

                dispatch(logout());
                // console.log(user);

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
        <div>
            <div className='w-full h-20 bg-black text-white font-sans font-bold p-4 grid grid-cols-3'>
                <div className='flex items-center text-2xl'>
                    <a href="/">THE_RANKERS</a>
                </div>
                <div className='flex items-center justify-center space-x-8 text-xl'>
                    <a href="/">HOME</a>
                    <a href="/about">ABOUT</a>
                    <a href="/contact">CONTACT</a>
                    <a href="/leaderboard">LEADERBOARD</a>
                    
                </div>
                <div className='flex items-center justify-end space-x-4'>
                    {user ? (
                        <>
                            <img
                                src={user.avatar_url}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm cursor-pointer"
                            />
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-base font-semibold transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (

                        <button
                            onClick={handleLogin}
                            className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-base font-semibold transition"
                        >
                            Sign in with GitHub
                        </button>

                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
