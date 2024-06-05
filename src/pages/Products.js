import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
// import "../style/ProductsPage.css";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.categoryName === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/product/get`);
      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="d-none d-md-block">
          <ListGroup>
            <ListGroup.Item
              active={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
              style={{ cursor: 'pointer' }}
            >
              All
            </ListGroup.Item>
            {categories.map((category) => (
              <ListGroup.Item
                key={category._id}
                active={category.name === selectedCategory}
                onClick={() => setSelectedCategory(category.name)}
                style={{ cursor: 'pointer' }}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="mb-4">
                  <Card.Img
                    variant="top"
                    src={product.images.length > 0 ? product.images[0] : 'placeholder.jpg'}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
