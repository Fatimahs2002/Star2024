import { Link } from 'react-router-dom';
import '../style/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className="">
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center w-100 ">
            <div className="footer_logo">
              <Link to="index.html">
                <img src="images/logo.png" alt="Footer Logo" />
              </Link>
            </div>
          </div>
          <div className="input_bt">
            <input
              type="text"
              className="mail_bt"
              placeholder="Your Email"
              name="Your Email"
            />
            <span className="subscribe_bt" id="basic-addon2">
              <Link to="#">Subscribe</Link>
            </span>
          </div>
          <div className="footer_menu">
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
          <div className="location_main">
            Help Line Number : <Link to="#">+961 70 00 11 33</Link>
          </div>
        </div>
      </div>
      {/* footer section end */}

      {/* copyright section start */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            © 2024 All Rights Reserved. Design by
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
