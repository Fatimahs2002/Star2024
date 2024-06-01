import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Ensure you import the CSS for react-toastify

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/user/getAll`);
      console.log(res.data);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchToAdmin = async (id) => {
    try {
      await axios.get(`http://localhost:8080/user/switchAdmin/${id}`);
      setUsers(users.map(user =>
        user._id === id ? { ...user, isAdmin: !user.isAdmin } : user
      ));
      toast.success("User switched to admin successfully");
    } catch (error) {
      console.error("There was an error switching to admin!", error);
      toast.error("Failed to switch user to admin");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  return (
    <>
      <h1>Users</h1>
      <ToastContainer />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleSwitchToAdmin(user._id)}
                  className="mr-2"
                >
                  <FontAwesomeIcon icon={faUserShield} />{' '}
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;


