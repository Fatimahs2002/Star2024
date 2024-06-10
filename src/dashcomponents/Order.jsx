// Order.jsx
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/orders');
  //     setOrders(response.data.data);
  //   } catch (error) {
  //     console.error('There was an error fetching the orders!', error);
  //     toast.error('Failed to fetch orders');
  //   }
  };

  return (
    <div>
      <h1>Orders</h1>
      <ToastContainer />
      <Table striped bordered hover>
        <thead>
          <tr>
          
            <th>Customer Name</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Order Date</th>
            <th>Order Status</th>
           
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.fullName}</td>
              <td>
                {order.products.map(product => (
                  <div key={product.productId._id}>
                    <strong>{product.productId.name}</strong>
                    <ul>
                      {product.selectedCharacteristics.map(characteristic => (
                        <li key={characteristic.characteristicId}>
                          {characteristic.characteristicId}: {characteristic.optionId.join(', ')}
                        </li>
                      ))}
                    </ul>
                    Quantity: {product.quantity}, Total Price: {product.totalPrice}
                  </div>
                ))}
              </td>
              <td>{order.totalPrice}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>{order.orderStatus}</td>
           
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
