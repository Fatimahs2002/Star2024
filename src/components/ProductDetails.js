import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from '../Context/CartContext';
import Header from "./Header";
import Footer from "./Footer";

const ProductDetails = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/product/getById/${ID}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [ID]);

  const handleImageError = (event) => {
    event.target.src = "path/to/fallback/image.jpg";
  };

  const handleAddToCart = () => {
    const selectedOptions = {
      weights: selectedWeights,
      color: selectedColor,
    };
    addToCart({ ...product, selectedOptions });
  };

  const handleWeightChange = (value) => {
    setSelectedWeights(prevSelectedWeights =>
      prevSelectedWeights.includes(value)
        ? prevSelectedWeights.filter(weight => weight !== value)
        : [...prevSelectedWeights, value]
    );
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const weightOptions = product.characteristics.find((char) => char.type.toLowerCase() === "size");
  const colorOptions = product.characteristics.find((char) => char.type.toLowerCase() === "color");

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row>
          <Col lg={6}>
            <img
              src={product.images?.[0] ?? "path/to/fallback/image.jpg"}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
              onError={handleImageError}
            />
            {product.images?.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name}
                style={{ width: "100px", height: "auto", margin: "10px" }}
                onError={handleImageError}
              />
            ))}
          </Col>
          <Col lg={6}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Category: {product.categoryName}</p>

            {weightOptions && (
              <>
                <h5>Weight</h5>
                <ListGroup>
                  <Row>
                    {weightOptions.options.map((option, index) => (
                      <Col key={index} xs={6} md={4} lg={3}>
                        <ListGroup.Item>
                          <Form.Check
                            type="checkbox"
                            label={`${option.value} - $${option.price}`}
                            value={option.value}
                            checked={selectedWeights.includes(option.value)}
                            onChange={() => handleWeightChange(option.value)}
                          />
                        </ListGroup.Item>
                      </Col>
                    ))}
                  </Row>
                </ListGroup>
              </>
            )}

            {colorOptions && (
              <>
                <h5>Color</h5>
                <ListGroup>
                  <Row>
                    {colorOptions.options.map((option, index) => (
                      <Col key={index} xs={6} md={4} lg={3}>
                        <ListGroup.Item>
                          <Form.Check
                            type="radio"
                            name="color"
                            label={option.value}
                            value={option.value}
                            checked={selectedColor === option.value}
                            onChange={handleColorChange}
                          />
                        </ListGroup.Item>
                      </Col>
                    ))}
                  </Row>
                </ListGroup>
              </>
            )}

            <Button
              variant="success"
              onClick={handleAddToCart}
              className="mt-3"
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
