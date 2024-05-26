import  { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faChartLine,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faBox,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Products";
import "../style/Sidebar.css";
import Category from "./Category";
import Report from "./Report";
import Order from "./Order";
import Users from "./Users";
import Login from "../pages/Login";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeComponent, setActiveComponent] = useState("");

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const pageContent = () => {
    switch (activeComponent) {
      case "order":
        return <Order />;
      case "product":
        return <Products />;
      case "category":
        return <Category />;
      case "user":
        return <Users />;
      case "reports":
        return <Report />;
      default:
        return <Order />;
    }
  };

  return (
    <div
      className={`d-flex ${
        isVisible ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      <div className="bg-light border-right sidebar" id="sidebar-wrapper">
        <div className="sidebar-header text-center my-3">
          <img
            src="/images/avatar.png"
            alt="avatar"
            className="icon rounded-circle"
          />
          {isVisible && <h5>John D</h5>}
        </div>
        <div className="list-group list-group-flush flex-grow-1">
          <div
            className="list-group-item list-group-item-action bg-light"
            onClick={() => setActiveComponent("order")}
          >
            <FontAwesomeIcon icon={faHome} />
            {isVisible && <span className="ml-1">Order</span>}
          </div>
          <div
            className="list-group-item list-group-item-action bg-light"
            onClick={() => setActiveComponent("user")}
          >
            <FontAwesomeIcon icon={faUser} />
            {isVisible && <span className="ml-1">Users</span>}
          </div>
          <div
            className="list-group-item list-group-item-action bg-light"
            onClick={() => setActiveComponent("category")}
          >
            <FontAwesomeIcon icon={faCog} />
            {isVisible && <span className="ml-1">Category</span>}
          </div>
          <div
            className="list-group-item list-group-item-action bg-light"
            onClick={() => setActiveComponent("product")}
          >
            <FontAwesomeIcon icon={faBox} />
            {isVisible && <span className="ml-1">Products</span>}
          </div>
          <div
            className="list-group-item list-group-item-action bg-light"
            onClick={() => setActiveComponent("reports")}
          >
            <FontAwesomeIcon icon={faChartLine} />
            {isVisible && <span className="ml-1">Reports</span>}
          </div>
          <div
  className="list-group-item list-group-item-action bg-light logout"
  onClick={() => setActiveComponent("logout")}
>
  <Link to="/login">
    <FontAwesomeIcon icon={faSignOutAlt} />
    {isVisible && <span className="ml-1">Logout</span>}
  </Link>
</div>

        </div>
      </div>

      <div id="page-content-wrapper" className="w-100 page-content">
        <nav className="navbar navbar-light bg-light border-bottom d-flex  align-items-center w-100">
          <Button variant="outline-primary" onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={isVisible ? faChevronLeft : faChevronRight}
            />
          </Button>
          <div className="d-flex align-items-center gap-3  nav_right">
            <FontAwesomeIcon icon={faBell} className="mr-3 nav-icon" />
            <FontAwesomeIcon icon={faUserCircle} className="mr-3 nav-icon" />
          </div>
        </nav>
        <div className="container-fluid">{pageContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
