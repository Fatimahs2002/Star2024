import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "", category: "Body care" },
    { id: 2, name: "", category: "Hair care" },
    {
      id: 3,
      name: "",
      category: "Detergents",
    },
    {
      id: 4,
      name: "",
      category: "Personal care",
    },
  ]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    category: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = (id) => {
    const confirmDelete = () => {
      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Category deleted successfully!");
    };

    toast(
      <div>
        Are you sure?
        <div className="mt-2 d-flex gap-3 align-center">
          <Button variant="danger" onClick={confirmDelete}>
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
        closeButton: true,
      }
    );
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setNewCategory({
      name: category.name,
      category: category.category,
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
    setNewCategory({ name: "", category: "" });
    toast.success("Category updated successfully!");
  };

  const handleAdd = () => {
    setCategories([
      ...categories,
      { id: categories.length + 1, ...newCategory },
    ]);
    setShowAddModal(false);
    setNewCategory({ name: "", category: "" });
    toast.success("Category added successfully!");
  };

  return (
    <>
      <h1>Category</h1>
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-between mb-3 w-100">
        <div className="d-flex align-items-center">
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="ms-2 w-100"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.category}</td>
              <td className="d-flex align-items-center gap-3">
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
                className="input_group"
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
                className="input_group"
              >
                <option value="">Select Category</option>
                <option value="Bodycare">Body care</option>
                <option value="Haircare">Hair care</option>
                <option value="Detergents">Detergents</option>
                <option value="Personal care">Personal care</option>
              </Form.Control>
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
                className="input_group"
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
                className="input_group"
              >
                <option value="">Select Category</option>
                <option value="Bodycare">Body care</option>
                <option value="Haircare">Hair care</option>
                <option value="Detergents">Detergents</option>
                <option value="Personal care">Personal care</option>
              </Form.Control>
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
