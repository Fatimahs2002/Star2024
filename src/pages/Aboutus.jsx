import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../style/About.css';

const Aboutus = () => {
  return (
    <>
      <Header />
      <div className="container py-3">
        <h1 className="text-center">About Us </h1>
        <div className="d-flex align-items-center justify-content-between g-4 mb-5">
          <div>
            <span className="text fs-5">
              Star is a chemical company manufacturing cleaning products such as
              detergents, disinfectants, all-purpose cleaners, heavy duty cleaners,
              soaps, sanitizers, shampoos, gels in addition to a variety of other
              specialty products.
            </span>
          </div>
          <div className="about_image">
            <img src="images/about.jpg" alt="about us_pic" />
          </div>
        </div>
        <h2 className="text-center my-4">Our Mission</h2>
        <p className="text-center fs-5">
          Our mission is to provide high-quality, innovative, and sustainable cleaning solutions
          that enhance the safety and cleanliness of homes and workplaces worldwide.
        </p>
        <h2 className="text-center my-4">Our History</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>Founded in 1990</h3>
              <p>Star was established with a vision to revolutionize the cleaning industry with superior products.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>First Milestone</h3>
              <p>Launched our first line of eco-friendly cleaning products in 1995.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>Expansion</h3>
              <p>Expanded to international markets in 2005, establishing a global presence.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">&#10003;</div>
            <div className="timeline-content">
              <h3>Innovation</h3>
              <p>Introduced our latest technology in cleaning products, setting new industry standards in 2015.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
