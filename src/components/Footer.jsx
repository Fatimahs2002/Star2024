import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
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
                <img src="/images/logo.png" alt="Footer Logo" />
              </Link>
            </div>
          </div>
          <div className="footer_social_icons d-flex w-100 align-items-center justify-content-between">
            <ul className="social_icons_list mr-2">
              <h5>On social media</h5>
              <li>
                <Link to="#">
                  <FontAwesomeIcon icon={faFacebook} className="footer_icon"/>
                  <span className="footer_text">Facebook</span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FontAwesomeIcon icon={faInstagram} className="footer_icon"/>
                  <span className="footer_text">Instagram</span>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="footer_icon"/>
                <span className="footer_text">+961 70 00 11 33</span>
              </li>
            </ul>
            <div className="useful_links">
              <h5>Useful Links</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/product">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="location_main">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>1234 Street Name, City, Country</span>
            </div>
          </div>
      
          <div className="additional_text">
            <p>some text.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quidem itaque nesciunt porro laboriosam, reprehenderit deserunt sunt odio est molestiae? Omnis itaque maiores voluptates atque quasi vero nobis eaque unde.
            Accusamus dolorum dolores ea fuga consequuntur, fugiat tenetur nobis maiores perferendis veritatis iusto quo odio tempora, ex excepturi vitae sint cum aliquam harum reiciendis qui, minima cupiditate. Odit, inventore illum.
            Voluptas repudiandae ratione beatae ab deleniti culpa dignissimos error natus enim cumque, quas autem mollitia maxime aperiam repellendus tenetur ad aliquam sint corrupti voluptate! Possimus necessitatibus modi error ipsa recusandae.
            Ducimus aperiam, quas dolorem, dolore ea rerum laborum sint quo provident sit consequatur repellendus dolores alias. Veritatis sed temporibus, quaerat quibusdam culpa, accusantium libero officia deserunt molestiae quis velit sunt!
            Laborum eligendi incidunt sint consequuntur ipsam ut quas illum beatae culpa ipsa nesciunt architecto perspiciatis itaque, quidem nulla consectetur facilis mollitia omnis expedita quae accusamus? Qui sapiente reiciendis exercitationem ad.
            Eum tempore amet dignissimos porro at sapiente fugiat culpa consectetur, officia ducimus. Minus cumque itaque nobis, accusamus, hic iure quod totam possimus, at doloremque enim. Nisi, cumque? Id, accusantium odit?
            Sit in tempora, voluptatum mollitia commodi voluptate harum recusandae repellendus distinctio quae iste maxime quaerat doloremque fuga animi excepturi cumque velit, architecto ea cum? Minima earum ratione veritatis blanditiis atque!
            Perferendis, necessitatibus sapiente. Atque eius recusandae laborum exercitationem totam eaque odit odio asperiores sequi, iusto ullam deserunt consequuntur dolores excepturi hic nemo veniam commodi, ratione praesentium accusamus? Provident, modi perferendis.
            Explicabo iste aperiam ex facere at nihil rerum quaerat illo quibusdam magnam omnis, consequatur accusamus harum dolores architecto, nobis voluptatum in minima repudiandae quam delectus. Nostrum esse reprehenderit rem. Officia.
            Qui corporis excepturi nobis libero saepe veritatis dolor dicta ut nulla ullam in omnis quisquam aspernatur adipisci numquam, culpa architecto, consequatur quae cumque iusto natus? Architecto aspernatur nam magni! Odit..</p>
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
