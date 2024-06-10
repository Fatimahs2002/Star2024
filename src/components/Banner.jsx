import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../style/Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner_section layout_padding">
      <Container>
        <Carousel id="my_slider" controls={true} indicators={false}>
          <Carousel.Item>
            <div className="row">
              <div className="col-sm-12">
                <h1 className="banner_taital text-white">
                  Discover Premium <br />
                  Cosmetics & Beauty
                </h1>
              
                <div className="buynow_bt p-2">
                  <Link to="#" className="bg-white text-black">Shop Now</Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row">
              <div className="col-sm-12">
                <h1 className="banner_taital text-white">
                  Enhance Your <br />
                  Cleaning Routine
                </h1>
                
                <div className="buynow_bt p-2">
                  <Link to="#" className="bg-white text-black">Shop Now</Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row">
              <div className="col-sm-12">
                <h1 className="banner_taital text-white">
                  Your Trusted <br />
                  Beauty Source
                </h1>
                
                <div className="buynow_bt p-2">
                  <Link to="#" className="bg-white text-black">Shop Now</Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;

