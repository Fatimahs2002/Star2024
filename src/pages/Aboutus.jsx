import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../style/About.css'
const Aboutus = () => {
  return (
    <>
      <Header />
      <div className="container py-3">
        <h1 className="text-center">About Us </h1>
        <div className="d-flex align-items-center justify-content-between g-4">
          <div>
         <span className="text fs-5"> Star is a chemical company manufacturing cleaning products such as
          detergents, disinfectants, all-purpose cleaners, heavy duty. cleaners,
          soaps, sanitizers, shampoos, gels in addition to a variety of other
          specialty products
          </span>
          </div>
          <div className="about_image">
            <img src="images/about.jpg" alt="about us_pic" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
