import { useState, useEffect } from "react";
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
    characteristics: [{ type: "", options: [{ value: "", price: 0 }] }],
    images: [],
    newImages: [],
    removedImages: [],
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
      setSelectedSubCategory("");
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
        characteristics: product.characteristics.map((char) => ({
          type: char.type,
          options: char.options,
        })),
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
    const newCharacteristics = [
      ...formData.characteristics,
      { type: "", options: [{ value: "", price: 0 }] },
    ];
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
    data.append("subCategoryName", formData.subCategoryName);
    data.append("characteristics", JSON.stringify(formData.characteristics));
    formData.newImages.forEach((image) => {
      data.append("newImages", image);
    });
    formData.removedImages.forEach((image) => {
      data.append("removedImages", image);
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
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formProductName">
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
            <Form.Group controlId="formDescription">
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
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
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
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
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
        </Form.Group>
        </Row>
        <Row>
        <Form.Group controlId="formSubCategory">
          <Form.Label>Subcategory</Form.Label>
          <Form.Control
            as="select"
            name="subCategoryName"
            value={formData.subCategoryName}
            onChange={handleInputChange}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        </Row>
        {/* <Row className="m"> */}
          <Col xs={12} md={6}>
            <Form.Group controlId="formCharacteristics">
              <Form.Label>Characteristics</Form.Label>
              {formData.characteristics.map((characteristic, charIndex) => (
                <div key={charIndex}>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Type"
                        name="type"
                        value={characteristic.type}
                        onChange={(e) =>
                          handleCharacteristicChange(charIndex, e)
                        }
                      />
                    </Col>
                  </Row>
                  {characteristic.options.map((option, optIndex) => (
                    <Row key={optIndex}>
                      <Col xs={12} md={4}>
                        <Form.Control
                          type="text"
                          placeholder="Option"
                          name={`options.${optIndex}.value`}
                          value={option.value}
                          onChange={(e) =>
                            handleCharacteristicChange(charIndex, e)
                          }
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Control
                          type="number"
                          placeholder="Price"
                          name={`options.${optIndex}.price`}
                          value={option.price}
                          onChange={(e) =>
                            handleCharacteristicChange(charIndex, e)
                          }
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleRemoveOption(charIndex, optIndex)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Row>
                    <Col>
                      <Button
                        variant="success"
                        onClick={() => handleAddOption(charIndex)}
                      >
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
        {/* </Row> */}
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <div>
                {formData.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      width="100"
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
        <Button variant="primary" type="submit">
          Update Product
        </Button>
        <Button variant="danger" onClick={handleCancel} className="ml-2">
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
