import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSortAlphaDown, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/ProductDash.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, itemsPerPage]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/product/getProducts`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          searchTerm: searchTerm // Pass the searchTerm as a parameter
        }
      });
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // When search term changes, reset to the first page
    setCurrentPage(1);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/product/delete/${productId}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("There was an error deleting the product!", error);
      toast.error("Error deleting the product. Please try again.");
    }
  };

  const handleSort = (column) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`);
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="product-dashboard">
      <ToastContainer />
      <div className="product-dashboard-header">
        <h1>Products</h1>
        <Button onClick={handleAdd} className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </Button>
      </div>
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                Name{" "}
                <FontAwesomeIcon
                  icon={sortOrder === "asc" ? faSortAlphaDown : faSortAlphaUp}
                  onClick={() => handleSort("name")}
                />
              </th>
              <th>Description</th>
              <th>Category</th>
              <th>Characteristics</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.categoryName}</td>
                <td>
                  {product.characteristics.map((char, index) => (
                    <div key={index}>
                      <strong>{char.type}</strong>
                      <ul>
                        {char.options.map((option, optIndex) => (
                          <li key={optIndex}>
                            {option.value} - ${option.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </td>
                <td>
                  {product.images.length > 0 && (
                    <img src={product.images[0]} alt="Product" width="100" />
                  )}
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(product._id)}
                    className="mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="pagination-buttons">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <Button variant="secondary" onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Products;

