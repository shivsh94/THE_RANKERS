import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/Login/loginSlice'
import GitHubLogin from './components/GitHubLogin'
import Home from './components/Home'
// import Leaderboard from './components/Leaderboard'

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser) {
      dispatch(login(storedUser));  // ✅ If user is already stored, log them in
    } else {
      const verifyUser = async () => {
        try {
          const token = localStorage.getItem("token");
          // console.log("Token:", token);
          
          if (!token) return;  

          const response = await axios.get("/auth/verify", {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.success) {
            dispatch(login(response.data.user));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", token);

          } else {
            dispatch(logout());
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Verification failed:", error);
          dispatch(logout());
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      };

      verifyUser();
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Toaster />
      <GitHubLogin />
      {/* <Leaderboard /> */}
      <Home/>
    </Router>
  );
}

export default App;
