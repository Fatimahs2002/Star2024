import React, { useState, useEffect, useContext } from "react";
import { Carousel, Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import { SearchContext } from "../Context/SearchContext"; // Import SearchContext
import "../style/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const { addToCart } = useContext(CartContext);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory !== "All") {
      fetchSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
      setSelectedSubCategory("All");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    } else {
      setProducts([]); 
    }
  }, [searchTerm]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryName) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/subcategory/get?category=${categoryName}`);
      setSubCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchProducts = async (search = "") => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/product/getProducts`, {
        params: { search },
      });
      // console.log(search ,"search")
      setProducts(res.data.data || []); 
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); 
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
    const subCategoryName = product.subCategoryName || "All";
    if (!acc[categoryName]) {
      acc[categoryName] = {};
    }
    if (!acc[categoryName][subCategoryName]) {
      acc[categoryName][subCategoryName] = [];
    }
    acc[categoryName][subCategoryName].push(product);
    return acc;
  }, {});

  const renderProductsBySubCategory = (subCategoryName, products) => {
    const productChunks = chunkArray(products, 3);
    return (
      <div key={subCategoryName}>
        <h2 className="text-center">{subCategoryName}</h2>
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
                          <h4 className="prod_text">{product.name}</h4> {/* Ensure product name is rendered */}
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
                              onClick={() =>
                                addToCart({
                                  ...product,
                                  id: product.id,
                                  selectedOptions: {
                                    weights: [],
                                    color: "",
                                  },
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
          ))}
        </Carousel>
      </div>
    );
  };

  const renderProductsByCategory = (categoryName, subCategories) => {
    const hasSubcategories = Object.keys(subCategories).length > 0;
    return (
      <div key={categoryName}>
        {hasSubcategories && <h1 className="text-center">{categoryName}</h1>}
        {hasSubcategories &&
          Object.keys(subCategories).map((subCategoryName) =>
            subCategoryName !== "" &&
            renderProductsBySubCategory(subCategoryName, subCategories[subCategoryName])
          )}
        {!hasSubcategories && <h1 className="text-center">{categoryName}</h1>}
        {categoryName === "" &&
          renderProductsBySubCategory(categoryName, subCategories[categoryName])}
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
        : renderProductsByCategory(
            selectedCategory,
            selectedSubCategory === "All"
              ? groupedProducts[selectedCategory] || {}
              : { [selectedSubCategory]: groupedProducts[selectedCategory][selectedSubCategory] || [] }
          )}
    </div>
  );
};

export default ProductsPage;
