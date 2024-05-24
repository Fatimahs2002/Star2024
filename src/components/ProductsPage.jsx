import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/ProductsPage.css';

const ProductsPage = () => {
  return (
    <div className="fashion_section">
      <Carousel id="main_slider" controls={true} indicators={false}>
        <Carousel.Item>
          <Container>
            <h1 className="fashion_taital">OUR PRODUCTS</h1>
            <div className="fashion_section_2">
              <Row>
                <Col lg={4} sm={4}>
                  <div className="box_main">
                    <h4 className="shirt_text">Shampo</h4>
                    <p className="price_text">Price <span style={{ color: '#262626' }}>$ 30</span></p>
                    <div className="img"><img src="/images/img.png" alt="cleaning tool" /></div>
                    <div className="btn_main">
                      <Button variant="primary" className="buy_bt">Buy Now</Button>
                      <Button variant="secondary" className="seemore_bt">See More</Button>
                    </div>
                  </div>
                </Col>
                <Col lg={4} sm={4}>
                  <div className="box_main">
                    <h4 className="shirt_text">Sapon</h4>
                    <p className="price_text">Price <span style={{ color: '#262626' }}>$ 30</span></p>
                    <div className="img"><img src="/images/img.png" alt="cleaning tool" /></div>
                    <div className="btn_main">
                      <Button variant="primary" className="buy_bt">Buy Now</Button>
                      <Button variant="secondary" className="seemore_bt">See More</Button>
                    </div>
                  </div>
                </Col>
                <Col lg={4} sm={4}>
                  <div className="box_main">
                    <h4 className="shirt_text">Pril</h4>
                    <p className="price_text">Price <span style={{ color: '#262626' }}>$ 30</span></p>
                    <div className="img"><img src="/images/img.png" alt="cleaning tool" /></div>
                    <div className="btn_main">
                      <Button variant="primary" className="buy_bt">Buy Now</Button>
                      <Button variant="secondary" className="seemore_bt">See More</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Carousel.Item>
       
        <Carousel.Item>
          <Container>
            <h1 className="fashion_taital">OUR PRODUCTS</h1>
            <div className="fashion_section_2">
              <Row>
                <Col lg={4} sm={4}>
                  <div className="box_main">
                    <h4 className="shirt_text">J dif</h4>
                    <p className="price_text">Price <span style={{ color: '#262626' }}>$ 30</span></p>
                    <div className="img"><img src="/images/img.png" alt="cleaning tool" /></div>
                    <div className="btn_main">
                      <Button variant="primary" className="buy_bt">Buy Now</Button>
                      <Button variant="secondary" className="seemore_bt">See More</Button>
                    </div>
                  </div>
                </Col>
                <Col lg={4} sm={4}>
                  <div className="box_main">
                    <h4 className="shirt_text">Flash</h4>
                    <p className="price_text">Price <span style={{ color: '#262626' }}>$ 30</span></p>
                    <div className="img"><img src="/images/img.png" alt="cleaning tool" /></div>
                    <div className="btn_main">
                      <Button variant="primary" className="buy_bt">Buy Now</Button>
                      <Button variant="secondary" className="seemore_bt">See More</Button>
                    </div>
                  </div>
                </Col>
                <Col lg={4} sm={4}>
                  <div className="box_main">
                    <h4 className="shirt_text">Clorex</h4>
                    <p className="price_text">Price <span style={{ color: '#262626' }}>$ 30</span></p>
                    <div className="img"><img src="/images/img.png" alt="cleaning tool" /></div>
                    <div className="btn_main">
                      <Button variant="primary" className="buy_bt">Buy Now</Button>
                      <Button variant="secondary" className="seemore_bt">See More</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ProductsPage;
