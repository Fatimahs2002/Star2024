import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Header.css";

const Header = () => {
  return (
    <>
      <div className="container">
        <div className="header_section_top">
          <div className="row">
            <div className="col-sm-12">
              <div className="custom_menu">
                <ul>
                  <li>
                    <Link to="#">Best Sellers</Link>
                  </li>
                  <li>
                    <Link to="#">Gift Ideas</Link>
                  </li>
                  <li>
                    <Link to="#">New Releases</Link>
                  </li>
                  <li>
                    <Link to="#">Today's Deals</Link>
                  </li>
                  <li>
                    <Link to="#">Customer Service</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar bg="" expand="lg" className="header_section">
        <Container>
          <Navbar.Brand href="#">E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Fashion
              </Nav.Link>
              <NavDropdown title="All Category" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="#">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#">
                  Another action
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline className="d-flex">
              <FormControl
                type="text"
                placeholder="Search this blog"
                className="mr-sm-2"
              />
              <Button
                style={{ backgroundColor: "#f26522", borderColor: "#f26522" }}
                className="btn"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            <Nav>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />{" "}
                <span className="padding_10">Cart</span>
              </Nav.Link>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faUser} aria-hidden="true" />{" "}
                <span className="padding_10">Account</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
