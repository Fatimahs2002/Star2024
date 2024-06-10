import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });

  // for subcategory
  const [subcategories, setSubcategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [showEditSubModal, setShowEditSubModal] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    categoryName: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  // fetch category
  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/category/get`);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch subcategory
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/SubCategory/get/${categoryId}`);
      setSubcategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/category/delete/${_id}`);
      setCategories(categories.filter((category) => category._id !== _id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the category!", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category._id);
    setNewCategory({ name: category.name });
    setShowEditModal(true);
  };

  const handleSave = async (_id) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/category/update/${_id}`, newCategory);
      setCategories(
        categories.map((category) =>
          category._id === _id ? { ...category, ...newCategory } : category
        )
      );
      setEditingCategory(null);
      setShowEditModal(false);
      setNewCategory({ name: "" });
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("There was an error updating the category!", error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/category/add`, newCategory);
      setCategories([...categories, { _id: res.data._id, ...newCategory }]);
      setShowAddModal(false);
      setNewCategory({ name: "" });
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("There was an error adding the category!", error);
    }
  };

  // Subcategory handlers
  const handleDeleteSubcategory = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/SubCategory/delete/${_id}`);
      setSubcategories(subcategories.filter((subcategory) => subcategory._id !== _id));
      toast.success("Subcategory deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the subcategory!", error);
    }
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory._id);
    setNewSubcategory({
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      categoryName: subcategory.categoryName,
    });
    setShowEditSubModal(true);
  };

  const handleSaveSubcategory = async (_id) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/SubCategory/update/${_id}`, newSubcategory);
      setSubcategories(
        subcategories.map((subcategory) =>
          subcategory._id === _id ? { ...subcategory, ...newSubcategory } : subcategory
        )
      );
      setEditingSubcategory(null);
      setShowEditSubModal(false);
      setNewSubcategory({ name: "", categoryId: "", categoryName: "" });
      toast.success("Subcategory updated successfully!");
    } catch (error) {
      console.error("There was an error updating the subcategory!", error);
    }
  };

  const handleAddSubcategory = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/SubCategory/add`, newSubcategory);
      setSubcategories([...subcategories, { _id: res.data._id, ...newSubcategory }]);
      setShowAddSubModal(false);
      setNewSubcategory({ name: "", categoryId: "", categoryName: "" });
      toast.success("Subcategory added successfully!");
    } catch (error) {
      console.error("There was an error adding the subcategory!", error);
    }
  };

  const openAddSubModal = (category) => {
    setNewSubcategory({ ...newSubcategory, categoryId: category._id, categoryName: category.name });
    setShowAddSubModal(true);
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

      <Table className="able text-start align-middle table-bordered table-hover mb-0">
        <thead>
          <tr className="text-dark">
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td className="d-flex align-items-center gap-3">
                <Button variant="warning" onClick={() => handleEdit(category)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(category._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  variant="primary"
                  onClick={() => openAddSubModal(category)}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Subcategory
                </Button>
                <Button
                  variant="info"
                  onClick={() => fetchSubcategories(category._id)}
                >
                  Fetch Subcategories
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

      {/* Add Subcategory Modal */}
      <Modal show={showAddSubModal} onHide={() => setShowAddSubModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newSubcategory.name}
                onChange={(e) =>
                  setNewSubcategory({ ...newSubcategory, name: e.target.value })
                }
                className="input_group"
              />
            </Form.Group>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newSubcategory.categoryName}
                disabled
                className="input_group"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddSubModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubcategory}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Subcategory Modal */}
      <Modal show={showEditSubModal} onHide={() => setShowEditSubModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditSubName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newSubcategory.name}
                onChange={(e) =>
                  setNewSubcategory({ ...newSubcategory, name: e.target.value })
                }
                className="input_group"
              />
            </Form.Group>
            <Form.Group controlId="formEditCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={newSubcategory.categoryName}
                disabled
                className="input_group"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditSubModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveSubcategory(editingSubcategory)}>
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
