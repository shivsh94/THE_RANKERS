import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const GitHubLogin = () => {
     
    const user = useSelector((state) => state.login.currentUser);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            toast.dismiss(); 
            toast.success("Login Successful!");
            navigate("/");
        } else if (!user) {
            toast.dismiss();
            toast("Please Login First!", { id: "login-toast" });
            navigate("/login");
        }
    }, [ ]);

    return null;
};

export default GitHubLogin;
