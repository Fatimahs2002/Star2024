import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button"; 
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email || !password) {
      toast.error("Email and Password are required");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setLoading(true); 

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/login`, {
        email,
        password,
      });

      if (response.data && response.data.data) {
        const token = response.data.data;
        sessionStorage.setItem("authToken", token);
        navigate("/");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Incorrect email or password");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Error occurred during login");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="mt-5">
      <ToastContainer />
      <div className="container d-flex align-items-center justify-content-center gap-2 login_cont">
          <div className="log_image">
          <img src="/images/login.svg" alt="login" />
        </div>
          <form className="form" onSubmit={handleLogin}>
          <h1 className="text-center fs-5">Welcome back you've been missed!</h1>
            <p className="title">Sign In</p>
            <label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span>Email</span>
            </label>
            <label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>Password</span>
            </label>
            <Button type="submit" className="login" disabled={!email || !password || loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="signin">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
    </div>
  );
};

export default Login;
