import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../style/AddProduct.css';

const AddPro = () => {
  const [product, setProduct] = useState({
    name: "",
    images: [],
    description: "",
    characteristics: [
      {
        type: "",
        options: [
          {
            value: "",
            price: 0,
          },
        ],
      },
    ],
    categoryName: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/category/get`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryName: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: files,
    }));
  };

  const handleCharacteristicChange = (index, e) => {
    const { name, value } = e.target;
    const newCharacteristics = [...product.characteristics];
    newCharacteristics[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      characteristics: newCharacteristics,
    }));
  };

  const handleOptionChange = (charIndex, optIndex, e) => {
    const { name, value } = e.target;
    const newCharacteristics = [...product.characteristics];
    newCharacteristics[charIndex].options[optIndex][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      characteristics: newCharacteristics,
    }));
  };

  const handleAddImage = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, null],
    }));
  };

  const handleAddCharacteristic = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      characteristics: [
        ...prevProduct.characteristics,
        {
          type: "",
          options: [
            {
              value: "",
              price: 0,
            },
          ],
        },
      ],
    }));
  };

  const handleAddOption = (charIndex) => {
    const newCharacteristics = [...product.characteristics];
    newCharacteristics[charIndex].options.push({
      value: "",
      price: 0,
    });
    setProduct((prevProduct) => ({
      ...prevProduct,
      characteristics: newCharacteristics,
    }));
  };

  const handleRemoveOption = (charIndex, optIndex) => {
    const newCharacteristics = [...product.characteristics];
    newCharacteristics[charIndex].options.splice(optIndex, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      characteristics: newCharacteristics,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    product.images.forEach((image, index) => {
      if (image) {
        formData.append(`images`, image);
      }
    });
    formData.append("description", product.description);
    formData.append("categoryName", product.categoryName);
    formData.append("characteristics", JSON.stringify(product.characteristics));

    axios
      .post(`${process.env.REACT_APP_URL}/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Product added successfully!");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      })
      .catch((error) => {
        toast.error("There was an error adding the product!");
      });
  };

  const handleCancel = () => {
    setProduct({
      name: "",
      images: [],
      description: "",
      characteristics: [
        {
          type: "",
          options: [
            {
              value: "",
              price: 0,
            },
          ],
        },
      ],
      categoryName: "",
    });
    navigate("/admin");
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Product Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Images:</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                multiple
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name:
              </label>
              <select
                id="categoryName"
                name="categoryName"
                className="form-control"
                value={product.categoryName}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Characteristics:</label>
              {product.characteristics.map((char, charIndex) => (
                <div key={charIndex} className="mb-3">
                  <input
                    type="text"
                    name="type"
                    className="form-control mb-2"
                    value={char.type}
                    onChange={(e) => handleCharacteristicChange(charIndex, e)}
                    required
                  />
                  <div>
                    <label>Options:</label>
                    {char.options.map((opt, optIndex) => (
                      <div key={optIndex} className="input-group mb-2">
                        <input
                          type="text"
                          name="value"
                          className="form-control"
                          value={opt.value}
                          onChange={(e) =>
                            handleOptionChange(charIndex, optIndex, e)
                          }
                          required
                        />
                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          value={opt.price}
                          onChange={(e) =>
                            handleOptionChange(charIndex, optIndex, e)
                          }
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveOption(charIndex, optIndex)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleAddOption(charIndex)}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddCharacteristic}
              >
                Add Characteristic
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPro;
