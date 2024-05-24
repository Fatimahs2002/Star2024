import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "T-Shirt", category: "Men", description: "Best T-Shirt" },
    { id: 2, name: "Dress", category: "Women", description: "Elegant Dress" },
    {
      id: 3,
      name: "Shoes",
      category: "Children",
      description: "Comfortable Shoes",
    },
  ]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [filter, setFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setNewCategory({
      name: category.name,
      category: category.category,
      description: category.description,
    });
    setShowEditModal(true);
  };

  const handleSave = (id) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, ...newCategory } : category
      )
    );
    setEditingCategory(null);
    setShowEditModal(false);
    setNewCategory({ name: "", category: "", description: "" });
  };

  const handleAdd = () => {
    setCategories([
      ...categories,
      { id: categories.length + 1, ...newCategory },
    ]);
    setShowAddModal(false);
    setNewCategory({ name: "", category: "", description: "" });
  };

  const filteredCategories = filter
    ? categories.filter((category) => category.category === filter)
    : categories;

  return (
    <>
      <h1>Category</h1>
      <div className="d-flex align-items-center justify-content-between mb-3 w-100">
        <div className="d-flex align-items-center">
          <Form.Select size="xl" onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Children">Children</option>
          </Form.Select>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="ms-2 w-100"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Category
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.category}</td>
              <td>{category.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(category)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(category.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Category Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={newCategory.category}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Children">Children</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEditCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={newCategory.category}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, category: e.target.value })
                }
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Children">Children</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEditDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave(editingCategory)}>
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
