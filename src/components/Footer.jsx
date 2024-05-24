import { Link } from 'react-router-dom';
import '../style/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className="footer_section py-4">
      <div className="container">
        <div className="footer_logo mb-3">
          <a href="index.html">
            <img src="images/footer-logo.png" alt="Footer Logo" />
          </a>
        </div>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Your Email" 
            name="Your Email" 
            aria-label="Your Email"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Subscribe
            </button>
          </div>
        </div>
        <div className="footer_menu mb-3">
          <ul className="list-unstyled d-flex justify-content-between">
            <li><Link to="#">Best Sellers</Link></li>
            <li><Link to="#">Gift Ideas</Link></li>
            <li><Link to="#">New Releases</Link></li>
            <li><Link to="#">Today's Deals</Link></li>
            <li><Link to="#">Customer Service</Link></li>
          </ul>
        </div>
        <div className="location_main">
          Help Line Number: <a href="tel:+1180012001200">+961 70338899</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
