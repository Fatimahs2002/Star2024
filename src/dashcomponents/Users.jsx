import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrash } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  // Example data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', order: 'Order #1', isAdmin: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '987-654-3210', order: 'Order #2', isAdmin: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phoneNumber: '555-555-5555', order: 'Order #3', isAdmin: false },
  ]);

  const handleSwitchToAdmin = (id) => {
    setCustomers(customers.map(customer =>
      customer.id === id ? { ...customer, isAdmin: !customer.isAdmin } : customer
    ));
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <>
      <h1>Users</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleSwitchToAdmin(customer.id)}
                  className="mr-2"
                >
                  <FontAwesomeIcon icon={faUserShield} />{' '}
                  {customer.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                </Button>
                <Button variant="danger" onClick={() => handleDelete(customer.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
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
