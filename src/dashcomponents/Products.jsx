import { useState } from "react";
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
  faTimes,
  faSave,
  faImage,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Flooer cleaner",
      description: "the best",
      category: "Detergents",
      characteristic: { size: "L", price: 20, weight: "200g" },
      image: "image1",
    },
    {
      id: 2,
      name: "Star Hand Soap",
      description: "the best",
      category: "body care",
      characteristic: { size: "XL", price: 30, weight: "500g" },
      image: "image2",
    },
    {
      id: 3,
      name: "Gel & wax",
      description: "the best",
      category: "Hair care",
      characteristic: { size: "Small", price: 50, weight: "1kg" },
      image: "image3",
    },
    {
      id: 4,
      name: "Alcohol",
      description: "the best",
      category: "Personal care",
      characteristic: { size: "Small", price: 50, weight: "1kg" },
      image: "image3",
    },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newImage, setNewImage] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    toast(
      <div>
        Are you sure?
        <div className="mt-2 d-flex gap-3 align-center">
          <Button variant="danger" onClick={() => confirmDelete(id)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => toast.dismiss()}>
            No
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: true,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setNewName(product.name);
    setNewDescription(product.description);
    setNewCategory(product.category);
    setNewSize(product.characteristic.size);
    setNewPrice(product.characteristic.price);
    setNewWeight(product.characteristic.weight);
    setNewImage(product.image);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isAdding) {
      const newProduct = {
        id: products.length + 1,
        name: newName,
        description: newDescription,
        category: newCategory,
        characteristic: { size: newSize, price: newPrice, weight: newWeight },
        image: newImage,
      };
      setProducts([...products, newProduct]);
    } else {
      setProducts(
        products.map((product) =>
          product.id === editingProduct
            ? {
                ...product,
                name: newName,
                description: newDescription,
                category: newCategory,
                characteristic: {
                  size: newSize,
                  price: newPrice,
                  weight: newWeight,
                },
                image: newImage,
              }
            : product
        )
      );
    }
    resetForm();
    setShowModal(false);
  };

  const handleAddImage = (id) => {
    toast.warning(`Add image for product ${id}`);
  };

  const handleRemoveImage = (id) => {
    toast.warning(`Remove image for product ${id}`);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setNewName("");
    setNewDescription("");
    setNewCategory("");
    setNewSize("");
    setNewPrice("");
    setNewWeight("");
    setNewImage("");
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
          onClick={() => {
            setIsAdding(true);
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </Button>

        <Form.Control
          type="text"
          placeholder="Search by name"
          className="mb-3"
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
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{`Size: ${product.characteristic.size}, Price: ${product.characteristic.price}, Weight: ${product.characteristic.weight}`}</td>
              <td>
                {product.image}
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="ml-2 mt-2"
                  onClick={() => handleAddImage(product.id)}
                >
                  <FontAwesomeIcon icon={faImage} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ml-2 mt-2"
                  onClick={() => handleRemoveImage(product.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(product)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isAdding ? "Add New Product" : "Edit Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Bodycare">Body care</option>
                <option value="Haircare">Hair care</option>
                <option value="Detergents">Detergents</option>
                <option value="Personal care">Personal care</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;
