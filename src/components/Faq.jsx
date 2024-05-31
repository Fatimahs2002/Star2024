import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Faq = () => {
  return (
    <div>
      {/* fashion section start */}
      <div className="fashion_section">
        <div id="main_slider" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <h1 className="fashion_taital">Our Products</h1>
                <div className="fashion_section_2">
                  <div className="row">
                    <div className="col-lg-4 col-sm-4">
                      <div className="box_main">
                        <h4 className="shirt_text">Shampo</h4>
                        <p className="price_text">
                          Price <span style={{ color: "#262626" }}>$ 30</span>
                        </p>
                        <div className="tshirt_img">
                          <img src="images/img.png" alt="" />
                        </div>
                        <div className="btn_main">
                          <div className="buy_bt">
                            <a href="#">Buy Now</a>
                          </div>
                          <div className="seemore_bt">
                            <a href="#">See More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-4">
                      <div className="box_main">
                        <h4 className="shirt_text"></h4>
                        <p className="price_text">
                          Price <span style={{ color: "#262626" }}>$ 30</span>
                        </p>
                        <div className="tshirt_img">
                          <img src="images/img.png" alt="" />
                        </div>
                        <div className="btn_main">
                          <div className="buy_bt">
                            <a href="#">Buy Now</a>
                          </div>
                          <div className="seemore_bt">
                            <a href="#">See More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-4">
                      <div className="box_main">
                        <h4 className="shirt_text">Hair wash</h4>
                        <p className="price_text">
                          Price <span style={{ color: "#262626" }}>$ 30</span>
                        </p>
                        <div className="tshirt_img">
                          <img src="images/img.png" alt="" />
                        </div>
                        <div className="btn_main">
                          <div className="buy_bt">
                            <a href="#">Buy Now</a>
                          </div>
                          <div className="seemore_bt">
                            <a href="#">See More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <h1 className="fashion_taital">Our Products</h1>
                  <div className="fashion_section_2">
                    <div className="row">
                      <div className="col-lg-4 col-sm-4">
                        <div className="box_main">
                          <h4 className="shirt_text">Shampo</h4>
                          <p className="price_text">
                            Price <span style={{ color: "#262626" }}>$ 30</span>
                          </p>
                          <div className="tshirt_img">
                            <img src="images/img.png" alt="" />
                          </div>
                          <div className="btn_main">
                            <div className="buy_bt">
                              <a href="#">Buy Now</a>
                            </div>
                            <div className="seemore_bt">
                              <a href="#">See More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <div className="box_main">
                          <h4 className="shirt_text">sapon</h4>
                          <p className="price_text">
                            Price <span style={{ color: "#262626" }}>$ 30</span>
                          </p>
                          <div className="tshirt_img">
                            <img src="images/img.png" alt="" />
                          </div>
                          <div className="btn_main">
                            <div className="buy_bt">
                              <a href="#">Buy Now</a>
                            </div>
                            <div className="seemore_bt">
                              <a href="#">See More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <div className="box_main">
                          <h4 className="shirt_text">Hair wash</h4>
                          <p className="price_text">
                            Price <span style={{ color: "#262626" }}>$ 30</span>
                          </p>
                          <div className="tshirt_img">
                            <img src="images/img.png" alt="" />
                          </div>
                          <div className="btn_main">
                            <div className="buy_bt">
                              <a href="#">Buy Now</a>
                            </div>
                            <div className="seemore_bt">
                              <a href="#">See More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#main_slider"
            role="button"
            data-slide="prev"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
          <a
            className="carousel-control-next"
            href="#main_slider"
            role="button"
            data-slide="next"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </div>
      </div>
      {/* fashion section end */}
      {/* <div class="loader_main">
        <div class="loader"></div>
      </div> */}

      {/* footer section start */}
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center w-100 ">
            <div className="footer_logo">
              <a href="index.html">
                <img src="images/logo.png" alt="Footer Logo" />
              </a>
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
              <a href="#">Subscribe</a>
            </span>
          </div>
          <div className="footer_menu">
            <ul>
              <li>
                <a href="#">Best Sellers</a>
              </li>
              <li>
                <a href="#">Gift Ideas</a>
              </li>
              <li>
                <a href="#">New Releases</a>
              </li>
              <li>
                <a href="#">Today's Deals</a>
              </li>
              <li>
                <a href="#">Customer Service</a>
              </li>
            </ul>
          </div>
          <div className="location_main">
            Help Line Number : <a href="#">+961 70 00 11 33</a>
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
      {/* copyright section end */}
    </div>
  );
};

export default Faq;
