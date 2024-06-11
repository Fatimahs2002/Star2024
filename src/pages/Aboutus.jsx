import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../style/About.css';

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="container py-3">
        <h1 className="about-us-header">About Us</h1> {/* Add the correct class here */}
 

        <h2 className="text-center">Our Products and Innovations</h2>
     
        <div className=" team-section">
          <div className="team-texr">
            <p>
              We offer our cleaning solutions designed to deliver first-class performance. Our cosmetics range includes skincare, haircare, and beauty products made from the finest ingredients. Our cleaners are known for their superior cleaning power and environmentally friendly formulas.
            </p>
            <p>
              At <b>Star Detergents & Cosmetics</b>, innovation is at the core of everything we do. Our R&D team is constantly developing new technologies to make cleaning easier and more efficient, and our cosmetics and detergents safer and more effective.
            </p>
          </div>
         
            <div className="team-image ">
              <img src="/images/young-latin-woman-smiling-confident-250nw-2189200179.webp" alt="Our Team" />
            </div>
       
        </div>

        <h2 className="text-center my-4">Our Team</h2>
        <div className="team-section">
          <div className="team-image ">
            <img src="/images/istockphoto-1432577235-612x612.jpg" alt="Our Team" />
          </div>
          <div className="team-text">
            <p>
              Our team at <b>Star Detergents & Cosmetics</b> is a group of dedicated professionals with diverse expertise and a shared passion for excellence. From research and development to production and customer service, every team member plays a vital role in our success.
            </p>
            <p>
              We believe in fostering a collaborative and innovative work environment where every voice is heard, and every contribution is valued. Our team's collective efforts ensure that we deliver the highest quality products and services to our customers.
            </p>
          </div>
        </div>

        <h2 className="text-center my-4">Our History</h2>
       
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>Our Beginning</h3>
              <p>Star was established with a vision to revolutionize the cleaning industry with superior products.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>First Milestone</h3>
              <p>Launched our first line of eco-friendly cleaning products, marking a significant step towards sustainability.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>Expansion</h3>
              <p>Expanded to international markets, establishing a global presence and reaching customers worldwide.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>Innovation</h3>
              <p>Introduced our latest technology in cleaning products, setting new industry standards and leading the market.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
