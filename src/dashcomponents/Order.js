import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      toast.error("Error fetching orders. Please try again.");
    }
  };

  const handleApproveOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "Delivered");
      toast.success("Order status updated successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status. Please try again.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/order/delete/${orderId}`);
      toast.success("Order deleted successfully!");
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order. Please try again.");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    return axios.put(
      `${process.env.REACT_APP_URL}/order/update/${orderId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  // const nextPage = () => {
  //   if (orders.length === itemsPerPage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const handleShowInvoice = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      const productPrice = product.productId?.price || 0;
      const optionsTotal = product.characteristics?.reduce((optTotal, characteristic) => {
        return (
          optTotal +
          characteristic.options.reduce((charTotal, option) => {
            return charTotal + (option.price || 0);
          }, 0)
        );
      }, 0) || 0;
      return total + productPrice + optionsTotal;
    }, 0);
  };

  return (
    <div>
      <h1>Orders</h1>
      <ToastContainer />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Products</th>
            <th>Order Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.user ? order.user.fullName : "N/A"}</td>
                <td>{order.user ? order.user.phoneNumber : "N/A"}</td>
                <td>
                  {order.products ? (
                    <ul>
                      {order.products.map((product, idx) => (
                        <li key={idx}>
                          <strong>Name:</strong> {product.productId?.name || "N/A"} <br />
                          <strong>Category:</strong> {product.productId?.categoryName || "N/A"} <br />
                          {product.characteristics?.map((characteristic, charIdx) => (
                            <div key={charIdx}>
                              <strong>{characteristic.type}:</strong>{" "}
                              {characteristic.options.map((option, optIdx) => (
                                <span key={optIdx}>
                                  {option.value} (${option.price.toFixed(2)})
                                </span>
                              ))}
                            </div>
                          ))}
                          <strong>Quantity:</strong> {product.quantity || 1} <br />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</td>
                <td>{`$${order.price}`}</td>
                <td>{order.orderStatus}</td>
                <td>
                  {order.orderStatus === "Pending" && (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleApproveOrder(order._id)}
                      >
                        Approve
                      </Button>{" "}
                    </>
                  )}
                  <Button variant="danger" onClick={() => handleDeleteOrder(order._id)} style={{ backgroundColor: 'red', borderColor: 'red' }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>{" "}
                  <Button variant="info" onClick={() => handleShowInvoice(order)}>
                    <FontAwesomeIcon icon={faFileInvoice} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <div>
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
      </div> */}

      {/* Invoice Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div ref={invoiceRef}>
              <h2>Invoice</h2>
              <p><strong>Company Name:</strong> Star Detergents & Cosmetics</p>
              <p><strong>Customer Name:</strong> {selectedOrder.user ? selectedOrder.user.fullName : "N/A"}</p>
              <p><strong>Email:</strong> {selectedOrder.user ? selectedOrder.user.email : "N/A"}</p>
              <p><strong>Telephone:</strong> {selectedOrder.user ? selectedOrder.user.phoneNumber : "N/A"}</p>
              <p><strong>Address:</strong> {selectedOrder.user ? selectedOrder.user.address : "N/A"}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
              <h3>Products:</h3>
              {selectedOrder.products.map((product, idx) => (
                <div key={idx} style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
                  <strong>Order {idx + 1}</strong>
                  <ul>
                    <li>
                      <strong>Name:</strong> {product.productId?.name || "N/A"} <br />
                      <strong>Category:</strong> {product.productId?.categoryName || "N/A"} <br />
                      <strong>Size:</strong> {product.selectedOptions?.sizes?.length > 0 ? product.selectedOptions.sizes.join(", ") : "Not specified"} <br />
                      <strong>Quantity:</strong> {product.quantity || 1} <br />
                    </li>
                  </ul>
                </div>
              ))}
              <p><strong>Total:</strong> {`$${selectedOrder.price}`}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
