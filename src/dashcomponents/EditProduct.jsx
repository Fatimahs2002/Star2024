import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryName: "",
    characteristics: [{ type: "", options: [{ value: "", price: 0 }] }],
    images: [],
    newImages: [],
    removedImages: []
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/product/getById/${id}`);
      const product = res.data.data;

      if (!product) {
        throw new Error("Product not found in response");
      }

      setFormData({
        name: product.name,
        description: product.description,
        categoryName: product.categoryName,
        characteristics: product.characteristics.map(char => ({
          type: char.type,
          options: char.options
        })),
        images: product.images,
        newImages: [],
        removedImages: []
      });
    } catch (error) {
      console.error("There was an error fetching the product details!", error);
      toast.error("Error fetching the product details. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
      toast.error("Error fetching categories. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setFormData({ ...formData, newImages: [...formData.newImages, ...images] });
  };

  const handleRemoveImage = (index) => {
    const removedImage = formData.images[index];
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
      removedImages: [...formData.removedImages, removedImage]
    });
  };

  const handleCharacteristicChange = (index, e) => {
    const { name, value } = e.target;
    const newCharacteristics = [...formData.characteristics];
    if (name === "type") {
      newCharacteristics[index].type = value;
    } else if (name.startsWith("options")) {
      const optionIndex = parseInt(name.split(".")[1], 10);
      const optionName = name.split(".")[2];
      newCharacteristics[index].options[optionIndex][optionName] = value;
    }
    setFormData({ ...formData, characteristics: newCharacteristics });
  };

  const handleAddOption = (index) => {
    const newCharacteristics = [...formData.characteristics];
    newCharacteristics[index].options.push({ value: "", price: 0 });
    setFormData({ ...formData, characteristics: newCharacteristics });
  };

  const handleRemoveOption = (charIndex, optIndex) => {
    const newCharacteristics = [...formData.characteristics];
    newCharacteristics[charIndex].options.splice(optIndex, 1);
    setFormData({ ...formData, characteristics: newCharacteristics });
  };

  const handleAddCharacteristic = () => {
    const newCharacteristics = [...formData.characteristics, { type: "", options: [{ value: "", price: 0 }] }];
    setFormData({ ...formData, characteristics: newCharacteristics });
  };

  const handleRemoveCharacteristic = (index) => {
    const newCharacteristics = [...formData.characteristics];
    newCharacteristics.splice(index, 1);
    setFormData({ ...formData, characteristics: newCharacteristics });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryName", formData.categoryName);
    data.append("characteristics", JSON.stringify(formData.characteristics));
    formData.newImages.forEach((image) => {
      data.append("newImages", image);
    });
    formData.removedImages.forEach((image) => {
      data.append("removedImages", image);
    });

    try {
      await axios.put(`${process.env.REACT_APP_URL}/product/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("There was an error updating the product!", error);
      toast.error("Error updating the product. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="container mt-5">
       <h2>Edit Product</h2>
    <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProductName">
        <Form.Label>Product Name</Form.Label>
        <Col xs={12} md={6}>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        </Col>
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Col xs={12} md={6}>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        </Col>
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Col xs={12} md={6}>
        <Form.Control
          as="select"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group controlId="formCharacteristics">
        <Form.Label>Characteristics</Form.Label>
        <Col xs={12} md={6}>
        {formData.characteristics.map((characteristic, charIndex) => (
          <div key={charIndex}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Type"
                  name="type"
                  value={characteristic.type}
                  onChange={(e) => handleCharacteristicChange(charIndex, e)}
                />
              </Col>
              {characteristic.options.map((option, optIndex) => (
                <Row key={optIndex}>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Option"
                      name={`options.${optIndex}.value`}
                      value={option.value}
                      onChange={(e) => handleCharacteristicChange(charIndex, e)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name={`options.${optIndex}.price`}
                      value={option.price}
                      onChange={(e) => handleCharacteristicChange(charIndex, e)}
                    />
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={() => handleRemoveOption(charIndex, optIndex)}>
                      Remove Option
                    </Button>
                  </Col>
                </Row>
              ))}
              <Col>
                <Button variant="success" onClick={() => handleAddOption(charIndex)}>
                  Add Option
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => handleRemoveCharacteristic(charIndex)}>
                  Remove Characteristic
                </Button>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="success" onClick={handleAddCharacteristic}>
          Add Characteristic
        </Button>
        </Col>
      </Form.Group>

      <Form.Group controlId="formImages">
        <Form.Label>Images</Form.Label>
        <Col xs={12} md={6}>
        <div>
          {formData.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Product Image ${index + 1}`} width="100" />
              <Button variant="danger" onClick={() => handleRemoveImage(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Form.Control type="file" multiple onChange={handleImageChange} />
        </Col>
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Product
      </Button>
      <Button variant="danger" onClick={handleCancel} className="ml-2">
        Cancel
      </Button>
      
    </Form>
    </div>
      </div>
      </div>
    </div>
  );
};

export default EditProduct;
