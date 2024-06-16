import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // To store the current logged-in user info

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser(); // Fetch the current logged-in user's information
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/getAll`);
      setUsers(res.data.data);
    } catch (error) {
      console.error("There was an error fetching users!", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/current`);
      setCurrentUser(res.data.data); // Assuming the current user's info is in res.data.data
    } catch (error) {
      console.error("There was an error fetching the current user!", error);
    }
  };

  const handleSwitchToAdmin = async (id) => {
    try {
      const user = users.find(user => user._id === id);
      const newRole = user.role === 'customer' ? 'admin' : 'customer';
      await axios.put(
        `${process.env.REACT_APP_URL}/user/switchAdmin/${id}`,
        { role: newRole },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(users.map(user =>
        user._id === id ? { ...user, role: newRole } : user
      ));
      toast.success(`User role switched to ${newRole} successfully!`);
    } catch (error) {
      console.error("There was an error switching the user's role!", error);
      toast.error("Failed to switch user role.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/user/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the user!", error);
      toast.error("Failed to delete user.");
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
            <th>Role</th>
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
              <td>{user.role}</td>
              <td className='d-flex align-items-center gap-3'>
                {user.role === "customer" && (
                  <Button
                    variant="warning"
                    onClick={() => handleSwitchToAdmin(user._id)}
                    className="mr-2" 
                  >
                    <FontAwesomeIcon icon={faUserShield} />{' '}
                    Make Admin
                  </Button>
                )}
                <Button variant="danger" onClick={() => handleDelete(user._id)}  style={{ backgroundColor: 'red', borderColor: 'red' }}>
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


