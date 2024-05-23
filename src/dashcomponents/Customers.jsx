import Table from 'react-bootstrap/Table';
const Customers = () => {
  // Example data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', order: 'Order #1' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '987-654-3210', order: 'Order #2' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phoneNumber: '555-555-5555', order: 'Order #3' },
  ];

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Order</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phoneNumber}</td>
            <td>{customer.order}</td>
          </tr>
        ))}
      </tbody>
     
    </Table>
  );
};

export default Customers;
