import React, { useState, useEffect, useContext } from "react";
import { Carousel, Container, Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import "../style/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
      const res = await axios.get(`${process.env.REACT_APP_URL}/product/getProducts`);
      const productsWithId = res.data.data.map((product, index) => ({
        ...product,
        id: product._id || index,
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

  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.categoryName || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});

  const renderProductsByCategory = (categoryName, products) => {
    const productChunks = chunkArray(products, 3);
    return (
      <div key={categoryName}>
        <h1 className="text-center">{categoryName}</h1>
        <Carousel
          controls={true}
          indicators={false}
          nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
          prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
        >
          {productChunks.map((productChunk, chunkIndex) => (
            <Carousel.Item key={chunkIndex}>
              <Container>
                <div className="prod_section_2">
                  <Row>
                    {productChunk.map((product, idx) => (
                      <Col key={idx} lg={4} sm={6}>
                        <div className="box_main">
                          <h4 className="prod_text">{product.name}</h4>
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
                              onError={handleImageError}
                            />
                          </div>
                          <div className="btn_main">
                            <Link to={`/products/${product._id}`}>
                              <span className="seemore">See More</span>
                            </Link>
                            <span
                              className=""
                              disabled
                              // onClick={() =>
                              //   addToCart({
                              //     ...product,
                              //     id: product.id,
                              //     selectedOptions: {
                              //       weights: [],
                              //       color: ""
                              //     }
                              //   })
                              // }
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
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <div className="prod_section">
      <div className="d-flex mb-4">
        <DropdownButton
          id="dropdown-basic-button"
          title={`Category: ${selectedCategory}`}
        >
          <Dropdown.Item eventKey="All" onClick={() => setSelectedCategory("All")}>
            All
          </Dropdown.Item>
          {categories.map((category) => (
            <Dropdown.Item
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
       
      </div>
      {selectedCategory === "All"
        ? Object.keys(groupedProducts).map((categoryName) =>
            renderProductsByCategory(categoryName, groupedProducts[categoryName])
          )
        : renderProductsByCategory(selectedCategory, groupedProducts[selectedCategory] || [])}
    </div>
  );
};

export default ProductsPage;
