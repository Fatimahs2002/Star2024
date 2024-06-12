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
import "../style/ProductDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const ProductDetails = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState([]);
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

    if (selectedSize.length === 0) {
      toast.error("Please select at least one price.");
      return;
    }

    const selectedOptions = {
      size: selectedSize,
    };

    const productToAdd = { ...product, selectedOptions, quantity };
    addToCart(productToAdd);
    toast.success("Item added to cart!");
  };

  const handleWeightChange = (value) => {
    setSelectedSize((prevSelectedSize) =>
      prevSelectedSize.includes(value)
        ? prevSelectedSize.filter((weight) => weight !== value)
        : [...prevSelectedSize, value]
    );
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
      if (char.type.toLowerCase() === "size" && selectedSize.length > 0) {
        char.options.forEach((option) => {
          if (selectedSize.includes(option.value)) {
            basePrice += option.price;
          }
        });
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

  const sizeOptions = product.characteristics?.find(
    (char) => char.type.toLowerCase() === "size"
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
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
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
              <p>home</p>
              <FontAwesomeIcon icon={faChevronRight} />
              <p>{product.categoryName}</p>
              <FontAwesomeIcon icon={faChevronRight} />
              <p>{product.name}</p>
            </div>

            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Category: {product.categoryName}</p>

            {sizeOptions && (
              <>
                <h5>Size</h5>
                <ListGroup>
                  <Row className="">
                    {sizeOptions.options.map((option, idx) => (
                      <Col key={idx} xs={6} md={4}>
                        <Form.Check 
                          type="checkbox"
                          id={`size-${option.value}`}
                          label={`${option.value} $ ${option.price}` }
                          value={option.value}
                          checked={selectedSize.includes(option.value)}
                          onChange={() => handleWeightChange(option.value)}
                        />
                      </Col>
                    ))}
                  </Row>
                </ListGroup>
              </>
            )}
            <div className="quantity-selector d-flex align-items-center gap-3">
              <button onClick={handleDecrement} className="q_button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  viewBox="0 0 20 20"
                  height="20"
                  fill="none"
                  className="svg-icon"
                >
                  <g strokeWidth="1.5" strokeLinecap="round" stroke="#de8a2a">
                    <circle r="7.5" cy="10" cx="10"></circle>
                    <path d="M7.5 10h5"></path>
                  </g>
                </svg>
               
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min="1"
                className="q_input"
              />
              <button onClick={handleIncrement} className="q_button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  viewBox="0 0 20 20"
                  height="20"
                  fill="none"
                  className="svg-icon"
                >
                  <g strokeWidth="1.5" strokeLinecap="round" stroke="#de8a2a">
                    <circle r="7.5" cy="10" cx="10"></circle>
                    <path d="M10 7.5v5"></path>
                    <path d="M7.5 10h5"></path>
                  </g>
                </svg>
              </button>
            </div>
            <h4>Price: ${calculatePrice()}</h4>
            <Button onClick={handleAddToCart} className="cart-add">Add to Cart</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
