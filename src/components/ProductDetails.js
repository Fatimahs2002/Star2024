import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import '../style/ProductDetails.css';

const ProductDetails = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cart } = useContext(CartContext);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/product/getById/${ID}`
        );
        const productData = res.data.data;
        // console.log("Fetched product data:", productData);
        setProduct(productData);
        if (productData.images?.length > 0) {
          setSelectedImage(productData.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [ID]);

  const handleImageError = (event) => {
    event.target.src = "path/to/fallback/image.jpg";
  };

  const handleAddToCart = () => {
    if (!product || !product._id) {
      console.error("Product data is not available or _id is missing.");
      return;
    }

    const selectedOptions = {
      weights: selectedWeights,
      color: selectedColor,
    };

    const productToAdd = { ...product, selectedOptions, quantity };
    addToCart(productToAdd);
    toast.success("Item added to cart!");
  };

  const handleWeightChange = (value) => {
    setSelectedWeights((prevSelectedWeights) =>
      prevSelectedWeights.includes(value)
        ? prevSelectedWeights.filter((weight) => weight !== value)
        : [...prevSelectedWeights, value]
    );
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const calculatePrice = () => {
    let basePrice = product?.price || 0;

    product?.characteristics?.forEach((char) => {
      if (char.type.toLowerCase() === "weight" && selectedWeights.length > 0) {
        char.options.forEach((option) => {
          if (selectedWeights.includes(option.value)) {
            basePrice += option.price;
          }
        });
      }

      if (char.type.toLowerCase() === "color" && selectedColor) {
        const colorOption = char.options.find(
          (option) => option.value === selectedColor
        );
        if (colorOption) {
          basePrice += colorOption.price;
        }
      }
    });

    return (basePrice * quantity).toFixed(2);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const weightOptions = product.characteristics?.find(
    (char) => char.type.toLowerCase() === "weight"
  );
  const colorOptions = product.characteristics?.find(
    (char) => char.type.toLowerCase() === "color"
  );

  return (
    <>
      <Header />
      <Container className="py-5">
        <ToastContainer />
        <Row>
          <Col lg={6}>
            <img
              src={selectedImage || "path/to/fallback/image.jpg"}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
              onError={handleImageError}
            />
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "auto",
                    margin: "10px",
                    cursor: "pointer",
                  }}
                  onError={handleImageError}
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </Col>
          <Col lg={6}>
            <div className="d-flex gap-3 pro_d">
              <p>home</p> <p>{product.categoryName}</p> <p>{product.name}</p>
            </div>

            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Category: {product.categoryName}</p>
            <p>Price: ${calculatePrice()}</p>
            {weightOptions && (
              <>
                <h5>Weight</h5>
                <ListGroup>
                  <Row>
                    {weightOptions.options.map((option, idx) => (
                      <Col key={idx} xs={6} md={4}>
                        <Form.Check
                          type="checkbox"
                          id={`weight-${option.value}`}
                          label={`${option.value} (+$${option.price})`}
                          value={option.value}
                          checked={selectedWeights.includes(option.value)}
                          onChange={() => handleWeightChange(option.value)}
                        />
                      </Col>
                    ))}
                  </Row>
                </ListGroup>
              </>
            )}
            {colorOptions && (
              <>
                <h5>Color</h5>
                <Form.Select
                  value={selectedColor}
                  onChange={handleColorChange}
                >
                  <option value="">Select Color</option>
                  {colorOptions.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.value} (+${option.price})
                    </option>
                  ))}
                </Form.Select>
              </>
            )}
            <div className="quantity-selector">
              <Button onClick={handleDecrement}>-</Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min="1"
              />
              <Button onClick={handleIncrement}>+</Button>
            </div>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
