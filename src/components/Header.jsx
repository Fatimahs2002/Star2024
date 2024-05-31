import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Header.css';
import { CartContext } from '../Context/CartContext';
import { getUserID } from '../util/userData';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
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
    navigate('/login');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const openNav = () => {
    document.getElementById('mySidenav').style.width = '250px';
  };

  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0';
  };

  return (
    <>
      <div className="banner_bg_main nav_back">
        <div className="container">
          <div className="header_section_top">
            <div className="row">
              <div className="col-sm-12">
                <div className="custom_menu">
                  <ul>
                    <li><Link to="#">Best Sellers</Link></li>
                    <li><Link to="#">Gift Ideas</Link></li>
                    <li><Link to="#">New Releases</Link></li>
                    <li><Link to="#">Today's Deals</Link></li>
                    <li><Link to="#">Customer Service</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center w-100 nav_back">
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
      <div className="container">
        <div className="containt_main">
          <div id="mySidenav" className="sidenav">
            <Link to="#" className="closebtn" onClick={closeNav}>&times;</Link>
            <Link to="/">Home</Link>
            <Link to="#">Products</Link>
            <Link to="/about">About Us</Link>
          </div>
          <span className="toggle_icon" onClick={openNav}>
            <img src="/images/toggle-icon.png" alt="toggle icon" />
          </span>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              All Category
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><Link className="dropdown-item" to="#">Action</Link></li>
              <li><Link className="dropdown-item" to="#">Another action</Link></li>
              <li><Link className="dropdown-item" to="#">Something else here</Link></li>
            </ul>
          </div>
          <div className="main">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search this blog" />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button" style={{ backgroundColor: "#f26522", borderColor:"#f26522" }}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className="header_box">
            <div className="login_menu">
              <ul>
                <li>
                  <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />
                    <span className="padding_10">Cart 
                      <span className="badge bg-primary">{cart.length}</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                    <span className="padding_10">Account</span>
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                    {isAuthenticated ? (
                      <>
                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                        <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                        <li><Link className="dropdown-item" to="/register">Register</Link></li>
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
