import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faUserPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Header.css";
import { CartContext } from "../Context/CartContext";
import { getUserID } from "../util/userData";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      setUserID(getUserID());
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setUserID(getUserID());
    setIsAuthenticated(true);
    navigate("/login");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <>
      <div className="banner_bg_main">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="container">
            <div className="row">
              <div className="d-flex align-items-center justify-content-center w-100">
                <div className="logo">
                  <Link to="/">
                    <img src="/images/logo.png" alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="containt_main">
          <div id="mySidenav" className="sidenav">
            <Link to="#" className="closebtn" onClick={closeNav}>
              &times;
            </Link>
            <Link to="/">Home</Link>
            {/* <Link to="/product">Products</Link> */}
            <Link to="/about">About Us</Link>
          </div>
          <span className="toggle_icon" onClick={openNav}>
            <img src="/images/toggle-icon.png" alt="toggle icon" />
          </span>
          
          <div className="main ">
            <div className="input-group d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search this blog"
              />
              <div className="input-group-append ">
                <button
                  className="btn btn-secondary"
                  type="button"
                  style={{ backgroundColor: "#0D4C90", borderColor: "none" }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className="header_box ">
            <div className="login_menu">
              <ul className="d-flex">
                <li>
                  <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />
                    <span className="padding_10 ">
                      Cart
                      <span className="blue-badge ">{cart.length}</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="accountDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                    <span className="padding_10">Account</span>
                  </Link>
                  <ul
                    className="dropdown-menu custom-dropdown"
                    aria-labelledby="accountDropdown"
                  >
                    {isAuthenticated ? (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={handleLogout}
                            to="#"
                          >
                            <FontAwesomeIcon
                              icon={faSignOutAlt}
                              aria-hidden="true"
                            />
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/login">
                            <FontAwesomeIcon
                              icon={faSignInAlt}
                              aria-hidden="true"
                            />
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/register">
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              aria-hidden="true"
                            />
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
