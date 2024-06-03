import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "../style/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center w-100 ">
            <div className="footer_logo">
              <Link to="/">
                <img src="images/logo.png" alt="Footer Logo" />
              </Link>
            </div>
          </div>
          <div className="footer_social_icons">
            <ul className="social_icons_list">
              <li>
                <Link to="#">
                  {/* <FontAwesomeIcon icon={faFacebook} /> */}
                </Link>
              </li>
              <li>
                <Link to="#">
                  {/* <FontAwesomeIcon icon={faInstagram} /> */}
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="location_main">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>1234 Street Name, City, Country</span>
            </div>
            <div className="location_main">
              <FontAwesomeIcon icon={faPhone} />
              <span>+961 70 00 11 33</span>
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
