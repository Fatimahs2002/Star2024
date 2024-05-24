import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Report = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', { customerName, email, order, price });
    setCustomerName('');
    setEmail('');
    setOrder('');
    setPrice('');
  };

  return (
    <div>
      <h1>Report Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCustomerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formOrder">
          <Form.Label>Order</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter order details"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Report
        </Button>
      </Form>
    </div>
  );
};

export default Report;
