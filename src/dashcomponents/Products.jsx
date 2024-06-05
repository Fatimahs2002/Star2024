import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faSave,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";
import "../style/ProductDash.css";

// YourComponent
function YourComponent({ formData, setFormData }) {
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <div>
      {formData.images.map((image, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={image}
            alt={`Product Image ${index + 1}`}
            style={{ width: "100px", marginRight: "10px" }}
          />
          <button onClick={() => handleRemoveImage(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

// Products Component
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryName: "",
    characteristics: [],
    images: [],
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [newCharacteristicType, setNewCharacteristicType] = useState("");
  const [newOptionValue, setNewOptionValue] = useState("");
  const [newOptionPrice, setNewOptionPrice] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/product/get`);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/product/delete/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      categoryName: product.categoryName,
      characteristics: product.characteristics,
      images: product.images,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...e.target.files],
    });
  };

  const handleAddCharacteristicType = () => {
    if (newCharacteristicType.trim() !== "") {
      setFormData({
        ...formData,
        characteristics: [
          ...formData.characteristics,
          { type: newCharacteristicType, options: [] },
        ],
      });
      setNewCharacteristicType("");
    }
  };

  const handleAddOption = (index) => {
    const updatedCharacteristics = [...formData.characteristics];
    updatedCharacteristics[index].options.push({
      value: newOptionValue,
      price: newOptionPrice,
    });
    setFormData({
      ...formData,
      characteristics: updatedCharacteristics,
    });
    setNewOptionValue("");
    setNewOptionPrice("");
  };

  const handleRemoveCharacteristic = (index) => {
    const updatedCharacteristics = [...formData.characteristics];
    updatedCharacteristics.splice(index, 1);
    setFormData({
      ...formData,
      characteristics: updatedCharacteristics,
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryName", formData.categoryName);
    data.append("characteristics", JSON.stringify(formData.characteristics));
    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/product/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts([...products, res.data.data]);
      toast.success("Product added successfully!");
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      console.error("There was an error adding the product!", error);
      toast.error("Error adding the product. Please try again.");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryName", formData.categoryName);
    data.append("characteristics", JSON.stringify(formData.characteristics));
    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_URL}/product/update/${editingProduct}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === editingProduct ? res.data.data : product
        )
      );
      toast.success("Product updated successfully!");
      resetForm();
      setShowEditModal(false);
    } catch (error) {
      console.error("There was an error updating the product!", error);
      toast.error("Error updating the product. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      categoryName: "",
      characteristics: [],
      images: [],
    });
  };

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Products</h1>
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-between m-2">
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => setShowAddModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </Button>

        <Form.Control
          type="text"
          placeholder="Search by name"
          className="mb-3 search_prod"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button variant="secondary" className="mb-3" onClick={handleSort}>
          <FontAwesomeIcon
            icon={sortOrder === "asc" ? faSortAlphaDown : faSortAlphaUp}
          />{" "}
          Sort by Name
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Characteristics</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.categoryName}</td>
              <td>
                {product.characteristics.map((char, index) => (
                  <div key={index}>
                    <strong>{char.type}:</strong>
                    {char.options.map((option, i) => (
                      <div key={i}>
                        Value: {option.value}, Price: {option.price}
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td>
  {product.images.length > 0 && (
    <img
      src={product.images[0]}
      alt={`Product Image 1`}
      style={{ width: "100px", marginRight: "10px" }}
    />
  )}
</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(product)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </td>
              <td>
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

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input_group"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input_group"
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                className="input_group"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNewCharacteristicType">
              <Form.Label>New Characteristic Type</Form.Label>
              <Form.Control
                type="text"
                value={newCharacteristicType}
                onChange={(e) => setNewCharacteristicType(e.target.value)}
                className="input_group"
              />
              <Button
                variant="primary"
                onClick={handleAddCharacteristicType}
                className="mt-2 mb-3"
              >
                Add Characteristic Type
              </Button>
            </Form.Group>
            {formData.characteristics.map((char, index) => (
              <div key={index} className="characteristic-group">
                <strong>{char.type}:</strong>
                <ul>
                  {char.options.map((option, i) => (
                    <li key={i}>
                      Value: {option.value}, Price: {option.price}
                    </li>
                  ))}
                </ul>
                <Form.Group controlId={`formNewOptionValue-${index}`}>
                  <Form.Label>New Value</Form.Label>
                  <Form.Control
                    type="text"
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                    className="input_group"
                  />
                </Form.Group>
                <Form.Group controlId={`formNewOptionPrice-${index}`}>
                  <Form.Label>New Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={newOptionPrice}
                    onChange={(e) => setNewOptionPrice(e.target.value)}
                    className="input_group"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => handleAddOption(index)}
                  className="mb-3"
                >
                  Add Option
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveCharacteristic(index)}
                  className="mb-3"
                >
                  Remove Characteristic
                </Button>
              </div>
            ))}
            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange}
                className="input_group"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Close
              </Button>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input_group"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input_group"
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                className="input_group"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {formData.characteristics.map((char, index) => (
              <div key={index} className="characteristic-group">
                <strong>{char.type}:</strong>
                <ul>
                  {char.options.map((option, i) => (
                    <li key={i}>
                      Value: {option.value}, Price: {option.price}
                    </li>
                  ))}
                </ul>
                <Form.Group controlId={`formNewOptionValue-${index}`}>
                  <Form.Label>New Value</Form.Label>
                  <Form.Control
                    type="text"
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                    className="input_group"
                  />
                </Form.Group>
                <Form.Group controlId={`formNewOptionPrice-${index}`}>
                  <Form.Label>New Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={newOptionPrice}
                    onChange={(e) => setNewOptionPrice(e.target.value)}
                    className="input_group"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => handleAddOption(index)}
                  className="mb-3"
                >
                  Add Option
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveCharacteristic(index)}
                  className="mb-3"
                >
                  Remove Characteristic
                </Button>
              </div>
            ))}

            <YourComponent formData={formData} setFormData={setFormData} />

            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange}
                className="input_group"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;
