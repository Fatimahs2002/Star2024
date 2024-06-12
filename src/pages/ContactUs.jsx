import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPencil, faComment, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import "../style/contact.css"; // Corrected the CSS import

const ContactUs = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <Header />
      <div id="contact">
      <section className="hero-section">
          <div className="hero-content ">
            <img src="/images/images.jpeg" alt="Contact Us" className="hero-image"/>
          
          </div>
        </section>
        <div className="container">
 
        {/* <h1 className="about-us-header">Contact Us</h1>  */}
          <div className="section-title">
            <h5>
              If you have any questions or need further information, please do not hesitate to reach out to us
            </h5>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="contact-form">
                <h3 className="text-center">Send Email</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                      <input type="text" name="name" className="form-control" id="name" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                      <input type="email" name="email" className="form-control" id="email" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <div className="input-group">
                      <span className="input-group-text"><FontAwesomeIcon icon={faPencil} /></span>
                      <input type="text" name="subject" className="form-control" id="subject" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <div className="input-group">
                      <span className="input-group-text"><FontAwesomeIcon icon={faComment} /></span>
                      <textarea className="form-control" name="message" rows="5" id="message" required></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn-submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5 " style={{ marginTop: '100px' }}>
              <div className="info-box">
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
                <div className="social-links">
                  <a href="https://www.facebook.com/Ets.Himaya?mibextid=JRoKGi" className="facebook social"><FontAwesomeIcon icon={faFacebook} /></a>
                  <a href="https://www.instagram.com/ets.himaya2?igsh=MTVpeTJxNnhnZXZodw==" className="instagram socail"><FontAwesomeIcon icon={faInstagram} /></a>
                  <a href="https://wa.me/message/BZNT4YDIWSS6E1" className="whatsapp socail"><FontAwesomeIcon icon={faWhatsapp} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;