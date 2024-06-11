import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
// import {
//   faMapMarkerAlt,
//   faPhone,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   faFacebook,
//   faInstagram,
// } 
// from "@fortawesome/free-brands-svg-icons";
import "../style/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="footer_social_icons d-flex w-100 justify-content-between">
            <ul className="social_icons_list mr-2">
              <h4 className="footer_title">On social media</h4>
              <li>
                <Link to="https://www.facebook.com/StarDetergentlb?mibextid=ZbWKwL" target="_blank">
                  <FontAwesomeIcon icon={faFacebook} className="footer_icon" />
                  <span className="footer_text">Facebook</span>
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/stardetergent?igsh=MWN1cW5laWZmaGNncQ==" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} className="footer_icon" />
                  <span className="footer_text">Instagram</span>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="footer_icon" />
                <span className="footer_text">+961 71 993 555</span>
              </li>
            </ul>
            <div className="useful_links mr-2">
              <ul>
                <h4 className="footer_title">Useful Links</h4>
                <li>
                  <Link to="/" className="link_footer">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="link_footer">About Us</Link>
                </li>
              </ul>
            </div>
            <div className="location_main">
            <h4 className="footer_title">Contact Us</h4>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span> Beirut, Lebanon</span>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <span> stardetergentlb@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            © 2024 All Rights Reserved. Design by
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
