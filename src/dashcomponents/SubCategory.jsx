import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/SubCategory/get`);
      const subcategoriesData = response.data.data;
      setSubcategories(subcategoriesData );
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  

  const handleEdit = (subcategory) => {
    setEditingSubcategory(subcategory);
    setEditName(subcategory.name);
  };

  // const handleSaveEdit = async () => {
  //   try {
  //     await axios.put(`${process.env.REACT_APP_URL}/SubCategory/update/${editingSubcategory._id}`, { name: editName });
  //     fetchSubcategories();
  //     setEditingSubcategory(null);
  //     setEditName('');
  //     toast.success('Subcategory updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating subcategory:', error);
  //   }
  // };
  const handleSaveEdit = async () => {
    if (!editingSubcategory || !editName) {
      toast.error('Please provide all required fields');
      return;
    }
  
    console.log('Editing Subcategory:', editingSubcategory);
    console.log('Edit Name:', editName);
  
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/SubCategory/update/${editingSubcategory._id}`,
        { name: editName }
      );
  
      if (response.status === 200) {
        fetchSubcategories();
        setEditingSubcategory(null);
        setEditName('');
        toast.success('Subcategory updated successfully!');
      } else {
        throw new Error('Failed to update subcategory');
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast.error('Error updating subcategory');
    }
  };

  const handleDelete = async (subcategoryId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/SubCategory/delete/${subcategoryId}`);
      fetchSubcategories();
      toast.success('Subcategory deleted successfully!');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return (
    <div>
      <h1>Subcategories</h1>
      <Table striped bordered hover>
  <thead>
    <tr>
    <th>Number</th>
      <th>Sub Category</th>
      {/* <th>Name</th> */}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {subcategories.map((subcategory, index) => (
      <tr key={subcategory._id}>
        <td>{index}</td>
        <td>{subcategory.name}</td>
        {/* <td>{subcategory.categoryName}</td> */}
        <td className='d-flex align-items-center gap-3'>
          <Button variant="warning" onClick={() => handleEdit(subcategory)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="danger" onClick={() => handleDelete(subcategory._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


      <Modal show={!!editingSubcategory} onHide={() => setEditingSubcategory(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingSubcategory(null)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default SubCategory;


