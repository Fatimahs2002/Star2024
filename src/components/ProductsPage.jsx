import React, { useState, useEffect, useContext } from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import "../style/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/product/get`);
      const productsWithId = res.data.data.map((product, index) => ({
        ...product,
        id: product.id || index,
      }));
      setProducts(productsWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageError = (event) => {
    event.target.src = "path/to/fallback/image.jpg";
  };

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const groupProductsByCategory = () => {
    const groupedProducts = {};
    products.forEach((product) => {
      const { categoryName } = product;
      if (!groupedProducts[categoryName]) {
        groupedProducts[categoryName] = [];
      }
      groupedProducts[categoryName].push(product);
    });
    return groupedProducts;
  };

  const groupedProducts = groupProductsByCategory();

  return (
    <div className="fashion_section">
      {Object.keys(groupedProducts).map((categoryName, index) => (
        <div key={index}>
          <h1 className="text-center">{categoryName}</h1>
          <Carousel
            id={`carousel_${index}`}
            controls={true}
            indicators={false}
            nextIcon={
              <span aria-hidden="true" className="carousel-control-next-icon" />
            }
            prevIcon={
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            }
          >
            {chunkArray(groupedProducts[categoryName], 3).map(
              (productChunk, chunkIndex) => (
                <Carousel.Item key={chunkIndex}>
                  <Container>
                    <div className="fashion_section_2">
                      <Row>
                        {productChunk.map((product, idx) => (
                          <Col key={idx} lg={4} sm={6}>
                            <div className="box_main">
                              <h4 className="shirt_text">{product.name}</h4>
                              <p className="price_text">
                                Price{" "}
                                <span style={{ color: "#262626" }}>
                                  $
                                  {product.characteristics && product.characteristics.length > 0
                                    ? product.characteristics[0].options[0].price
                                    : "N/A"}
                                </span>
                              </p>
                              <div className="image-container">
                                <img
                                  className="animated-image"
                                  src={
                                    product.images && product.images.length > 0
                                      ? product.images[0]
                                      : "path/to/fallback/image.jpg"
                                  }
                                  alt={product.name}
                                  style={{ width: "100%", height: "auto" }}
                                  onError={handleImageError}
                                />
                              </div>
                              <div className="btn_main">
                                <Link to={`/products/${product._id}`}>
                                  <span
                                    className="seemore"
                                  >
                                    See More
                                  </span>
                                </Link>
                                <span
                                  className="addtocart"
                                  onClick={() =>
                                    addToCart({ 
                                      ...product, 
                                      id: product.id,
                                      selectedOptions: {
                                        weights: [],
                                        color: ''
                                      }
                                    })

                                  }
                                >
                                  Add to Cart
                                </span>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Container>
                </Carousel.Item>
              )
            )}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
