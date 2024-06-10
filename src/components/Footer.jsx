import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "../style/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer_title">About</h4>
            <p className="about_us_text">
              Star is a leading manufacturer of high-quality cosmetics and detergents, 
              committed to innovation, quality, and customer satisfaction.
            </p>
            <h4 className="footer_title">Follow Us</h4>
            <ul className="social_icons_list">
              <li>
                <Link to="https://www.facebook.com/StarDetergentlb?mibextid=ZbWKwL" target="_blank">
                  <FontAwesomeIcon icon={faFacebook} className="footer_icon" />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/stardetergent?igsh=MWN1cW5laWZmaGNncQ==" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} className="footer_icon" />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/stardetergent?igsh=MWN1cW5laWZmaGNncQ==" target="_blank">
                  <FontAwesomeIcon icon={faWhatsapp} className="footer_icon" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer_title">Useful Links</h4>
            <ul className="useful_links">
              <li>
                <Link to="/" className="link_footer">Home</Link>
              </li>
              <li>
                <Link to="/about" className="link_footer">About Us</Link>
              </li>
              
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 mb-4">
            <h4 className="footer_title">Contact Us</h4>
            <div className="contact_info">
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="footer_icon" />
                <span> Beirut, Lebanon</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} className="footer_icon" />
                <span> stardetergentlb@gmail.com</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faPhone} className="footer_icon" />
                <span>+961 71 993 555</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright_section text-center py-3">
        <div className="container">
          <p className="copyright_text">
            © 2024 All Rights Reserved. Design Dr.Website  70 209 678
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
