import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
} 
from "@fortawesome/free-brands-svg-icons";
import "../style/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <div className="footer_section layout_padding">
        <div className="container">
          {/* <div className="d-flex align-items-center justify-content-center w-100 ">
            <div className="footer_logo">
              <Link to="/">
                <img src="/images/logo.png" alt="Footer Logo" />
              </Link>
            </div>
          </div> */}
          <div className="footer_social_icons d-flex w-100 align-items-center justify-content-between">
            <ul className="social_icons_list mr-2">
              <h4 className="footer_title">On social media</h4>
              <li>
                <Link to="#">
                  <FontAwesomeIcon icon={faFacebook} className="footer_icon" />
                  <span className="footer_text">Facebook</span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FontAwesomeIcon icon={faInstagram} className="footer_icon" />
                  <span className="footer_text">Instagram</span>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="footer_icon" />
                <span className="footer_text">+961 70 00 11 33</span>
              </li>
            </ul>
            <div className="useful_links">
              <h4 className="footer_title">Useful Links</h4>
              <ul>
                <li>
                  <Link to="/" className="link_footer">Home</Link>
                </li>
                <li>
                  <Link to="/product" className="link_footer">Products</Link>
                </li>
                <li>
                  <Link to="/about" className="link_footer">About Us</Link>
                </li>
              </ul>
            </div>
            <div className="location_main">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>1234 Street Name, City, Country</span>
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
