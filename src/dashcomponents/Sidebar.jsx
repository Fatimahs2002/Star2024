import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faThList,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faBox,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Products";
import "../style/Sidebar.css";
import Category from "./Category";
import Order from "./Order";
import Users from "./Users";
import SubCategory from "./SubCategory";

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
      case "subCategory":
        return <SubCategory />;
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
      <div
        bg=""
        className="bg-light border-right sidebar"
        id="sidebar-wrapper"
      >
        <div className="bg-light sidebar-header my-3">
          <div className="">
            {isVisible && <p className="admin_font">Admin</p>}
          </div>
        </div>
        <div className=" list-group list-group-flush flex-grow-1">
          <div
            className="bg-light nav-link active"
            onClick={() => setActiveComponent("order")}
          >
            <div className="side_icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            {isVisible && <span className="ml-1">Order</span>}
          </div>
          <div
            className="bg-light nav-link"
            onClick={() => setActiveComponent("user")}
          >
            <div className="side_icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            {isVisible && <span className="ml-1">Users</span>}
          </div>
          <div
            className="bg-light nav-link"
            onClick={() => setActiveComponent("category")}
          >
            <div className="side_icon">
              <FontAwesomeIcon icon={faThList} />
            </div>
            {isVisible && <span className="ml-1">Category</span>}
          </div>
          <div
            className="bg-light nav-link"
            onClick={() => setActiveComponent("subCategory")}
          >
            <div className="side_icon">
              <FontAwesomeIcon icon={faThList} />
            </div>
            {isVisible && <span className="ml-1">Sub Category</span>}
          </div>
          <div
            className="bg-light nav-link"
            onClick={() => setActiveComponent("product")}
          >
            <div className="side_icon">
              <FontAwesomeIcon icon={faBox} />
            </div>
            {isVisible && <span className="ml-1">Products</span>}
          </div>
       
        </div>
      </div>

      <div id="page-content-wrapper" className="w-100 page-content">
        <nav className="bg-light navbar border-bottom d-flex align-items-center w-100">
          <Button variant="outline-primary" onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={isVisible ? faChevronLeft : faChevronRight}
            />
          </Button>
          <div className="d-flex align-items-center gap-3 nav_right">
            <div className="d-flex align-items-center w-100 justify-content-center">
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div className="side_icon">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="mr-3"
                      />
                    </div>
                    <p className="mb-0">Account</p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link
                      to="/login"
                      className="d-flex align-items-center"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      {isVisible && <span className="">Logout</span>}
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
        <div className="container-fluid">{pageContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
