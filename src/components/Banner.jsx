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
                <h1 className="banner_taital text-black">
                  Get Start <br />
                  Your favorite shopping
                </h1>
                <div className="buynow_bt">
                  <Link to="#">Buy Now</Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row">
              <div className="col-sm-12">
                <h1 className="banner_taital text-black">
                  Get Start <br />
                  Your favorite shopping
                </h1>
                <div className="buynow_bt">
                  <Link to="#">Buy Now</Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row">
              <div className="col-sm-12">
                <h1 className="banner_taital text-black">
                  Get Start <br />
                  Your favorite shopping
                </h1>
                <div className="buynow_bt">
                  <Link to="#">Buy Now</Link>
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
