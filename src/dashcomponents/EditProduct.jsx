import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryName: "",
    subCategoryName: "",
    characteristics: [],
    images: [],
    newImages: [],
    removedImages: [],
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        subCategoryName: "",
      }));
    }
  }, [selectedCategory]);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/product/getById/${id}`
      );
      const product = res.data.data;

      if (!product) {
        throw new Error("Product not found in response");
      }

      setFormData({
        name: product.name,
        description: product.description,
        categoryName: product.categoryName,
        subCategoryName: product.subCategoryName,
        characteristics: product.characteristics,
        images: product.images,
        newImages: [],
        removedImages: [],
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

  const fetchSubCategories = async (categoryName) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/subcategory/get?category=${categoryName}`
      );
      setSubCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Error fetching subcategories. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "categoryName") {
      setSelectedCategory(value);
    }
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
      removedImages: [...formData.removedImages, removedImage],
    });
  };

  const handleCharacteristicChange = (charIndex, field, value) => {
    const updatedCharacteristics = [...formData.characteristics];
    if (field.includes("options")) {
      const [optIndex, optField] = field.split("-").slice(1);
      updatedCharacteristics[charIndex].options[optIndex][optField] = value;
    } else {
      updatedCharacteristics[charIndex][field] = value;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      characteristics: updatedCharacteristics,
    }));
  };

  const handleAddCharacteristic = () => {
    const updatedCharacteristics = [
      ...formData.characteristics,
      { type: "", options: [{ value: "", price: 0 }] },
    ];
    setFormData({ ...formData, characteristics: updatedCharacteristics });
  };

  const handleRemoveCharacteristic = (charIndex) => {
    const updatedCharacteristics = [...formData.characteristics];
    updatedCharacteristics.splice(charIndex, 1);
    setFormData({ ...formData, characteristics: updatedCharacteristics });
  };

  const handleAddOption = (charIndex) => {
    const updatedCharacteristics = [...formData.characteristics];
    updatedCharacteristics[charIndex].options.push({ value: "", price: 0 });
    setFormData({ ...formData, characteristics: updatedCharacteristics });
  };

  const handleRemoveOption = (charIndex, optIndex) => {
    const updatedCharacteristics = [...formData.characteristics];
    updatedCharacteristics[charIndex].options.splice(optIndex, 1);
    setFormData({ ...formData, characteristics: updatedCharacteristics });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryName", formData.categoryName);
    data.append("subCategoryName", formData.subCategoryName);
    data.append("characteristics", JSON.stringify(formData.characteristics));
    formData.newImages.forEach((image) => {
      data.append("newImages", image);
    });
    formData.removedImages.forEach((image) => {
      data.append("imagesToRemove", image);
    });

    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/product/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    <Container className="mt-5">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formProductName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryName"
                value={formData.categoryName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formSubCategory" className="mb-3">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                as="select"
                name="subCategoryName"
                value={formData.subCategoryName}
                onChange={handleInputChange}
                disabled={!selectedCategory} // Disable if no category selected
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.name}>
                    {subCategory.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formCharacteristics">
              <Form.Label>Characteristics</Form.Label>
              {formData.characteristics.map((characteristic, charIndex) => (
                <div key={charIndex} className="mb-3">
                  <Row className="align-items-center">
                    <Col xs={12} md={6} className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Type"
                        name={`characteristics.${charIndex}.type`}
                        value={characteristic.type}
                        onChange={(e) =>
                          handleCharacteristicChange(charIndex, "type", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  {characteristic.options.map((option, optIndex) => (
                    <Row key={optIndex} className="align-items-center mb-2">
                      <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <Form.Control
                          type="text"
                          placeholder="Option"
                          name={`characteristics.${charIndex}.options.${optIndex}.value`}
                          value={option.value}
                          onChange={(e) =>
                            handleCharacteristicChange(charIndex, `options-${optIndex}-value`, e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <Form.Control
                          type="number"
                          placeholder="Price"
                          name={`characteristics.${charIndex}.options.${optIndex}.price`}
                          value={option.price}
                          onChange={(e) =>
                            handleCharacteristicChange(charIndex, `options-${optIndex}-price`, e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveOption(charIndex, optIndex)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Row className="mb-3">
                    <Col>
                      <Button variant="success" onClick={() => handleAddOption(charIndex)}>
                        <FontAwesomeIcon icon={faPlus} /> Add Option
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveCharacteristic(charIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Remove Characteristic
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button variant="success" onClick={handleAddCharacteristic}>
                <FontAwesomeIcon icon={faPlus} /> Add Characteristic
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <div className="mb-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      width="100"
                      className="mr-2"
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                ))}
              </div>
              <Form.Control type="file" multiple onChange={handleImageChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex align-items-center justify-content-between w-100">
            <Button variant="primary" type="submit">
              Update Product
            </Button>
            <Button variant="danger" onClick={handleCancel} className="ml-2">
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditProduct;
