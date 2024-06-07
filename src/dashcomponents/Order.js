import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, itemsPerPage]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/order/get`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setOrders(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/order/update/${orderId}`,
        { status },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(`Order status updated successfully!`);
      fetchOrders();
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      toast.error(
        `Error updating order status. Please try again.`
      );
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/order/delete/${orderId}`
      );
      toast.success("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order. Please try again.");
    }
  };

  const nextPage = () => {
    if (orders.length === itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <ToastContainer />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Products</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.user ? order.user.fullName : "N/A"}</td>
              <td>
                {order.products ? (
                  <ul>
                    {order.products.map((product, idx) => (
                      <li key={idx}>
                        <strong>Name:</strong> {product.name} <br />
                        <strong>Quantity:</strong> {product.quantity} <br />
                        <strong>Category:</strong> {product.categoryName} <br />
                        {product.selectedOptions && (
                          <>
                            <strong>Color:</strong> {product.selectedOptions.color} <br />
                            <strong>Weight:</strong> {product.selectedOptions.weights.join(", ")} <br />
                          </>
                        )}
                        {product.characteristics && (
                          <>
                            <strong>Characteristics:</strong> 
                            <ul>
                              {product.characteristics.map((char, cidx) => (
                                <li key={cidx}>
                                  {char.key}: {char.value}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{order.orderStatus}</td>
              <td>
                {order.orderStatus === "Pending" && (
                  <>
                    <Button
                      variant="success"
                      onClick={() => updateOrderStatus(order._id, "Delivered")}
                    >
                      Approve
                    </Button>{" "}
                  </>
                )}
                <Button variant="danger" onClick={() => deleteOrder(order._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <Button variant="secondary" onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Order;
