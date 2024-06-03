import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !phoneNumber || !address) {
      toast.error("All fields are required");
      return;
    }

    if (fullName.trim().indexOf(" ") === -1) {
      toast.error("Full name should contain both first and last name");
      return;
    }

    const user = {
      fullName,
      email,
      password,
      phoneNumber,
      address,
    };

    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/user/register`, user);
      navigate("/");
      toast.success("Registered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-md-6">
          <img src="/images/regi.svg" alt="Register" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="form">
            <p className="title">Register</p>
            <p className="message">
              Signup now and get full access to our shop.
            </p>

            <label>
              <input
                className="input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <span>Full Name</span>
            </label>

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
            <label>
              <input
                className="input"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <span>Phone Number</span>
            </label>
            <label>
              <input
                className="input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <span>Address</span>
            </label>
            <Button type="submit" className="submit" disabled={loading}>
              {loading ? "Registering..." : "Submit"}
            </Button>
            <p className="signin">
              Already have an account? <Link to="/login">Signin</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
