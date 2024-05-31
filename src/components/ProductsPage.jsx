import React, { useState, useEffect, useContext } from "react";
import { Carousel, Container, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import "../style/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/category/get");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/product/get");
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

  const handleSeeMore = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

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
                                    ? product.characteristics.map((char) => char.price).join(" / ")
                                    : "N/A"}
                                </span>
                              </p>
                              <div className="img">
                                <img
                                  src={
                                    product.images?.[0] ??
                                    "path/to/fallback/image.jpg"
                                  }
                                  alt={product.name}
                                  style={{ width: "100%", height: "auto" }}
                                  onError={handleImageError}
                                />
                              </div>
                              <div className="btn_main">
                                <Button
                                  variant="secondary"
                                  className="seemore_bt"
                                  onClick={() => handleSeeMore(product)}
                                >
                                  See More
                                </Button>
                                <Button
                                  variant="success"
                                  className="addtocart_bt"
                                  onClick={() =>
                                    addToCart({ ...product, id: product.id })
                                  }
                                >
                                  Add to Cart
                                </Button>
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

      <Modal show={showModal} onHide={handleClose}>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedProduct.description}</p>
              <img
                src={
                  selectedProduct.images?.[0] ?? "path/to/fallback/image.jpg"
                }
                alt={selectedProduct.name}
                style={{ width: "100%", height: "auto" }}
                onError={handleImageError}
              />
              <p className="price_text">
                Price:{" "}
                <span style={{ color: "#262626" }}>
                  $
                  {selectedProduct.characteristics && selectedProduct.characteristics.length > 0
                    ? selectedProduct.characteristics.map((char) => char.price).join(" / ")
                    : "N/A"}
                </span>
              </p>
              <div>
                <h5>Characteristics:</h5>
                <ul>
                  {selectedProduct.characteristics?.map((char, index) => (
                    <li key={index}>
                      <strong>{char.type}:</strong> {char.value} - ${char.price}
                    </li>
                  ))}
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  addToCart(selectedProduct);
                  handleClose();
                }}
              >
                Buy
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProductsPage;
