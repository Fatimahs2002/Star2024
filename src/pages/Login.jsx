import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    try {
      const response = await axios.post(`http://localhost:8080/user/login`, {
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
    }
  };

  return (
    <div className="mt-5">
      <ToastContainer />
      <div className="container d-flex align-items-center  justify-content-center gap-2">

        <div className="log_image">
          <img src="/images/login.svg" alt="login" />
        </div>
        <div>
        <h1 className="text-center fs-5">Welcome back you've been missed!</h1>

        <Form onSubmit={handleLogin} className="form_in">
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="log_input"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="log_input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>
        <div class="row">
          <div class="col-12">
            <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
              <Link to="/register" class="link-secondary text-decoration-none">
                Create new account
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
