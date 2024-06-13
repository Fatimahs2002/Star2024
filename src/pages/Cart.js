import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { Container, Row, Col, Form, ListGroup, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserID } from '../util/userData';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../style/cart.css';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    submitCart,
    cartID,
    calculateItemPrice,
  } = useContext(CartContext);
  const [userID, setUserID] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getUserID();
      setUserID(id);
    };
    fetchUserID();
  }, []);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = async () => {
    if (!userID || !cartID) {
      toast.error('You must be logged in!');
    } else if (!paymentMethod) {
      toast.error('Please select a payment method!');
    } else {
      try {
        const totalAmount = cart.reduce((total, item) => {
          return total + calculateItemPrice(item) * item.quantity;
        }, 0);

        await submitCart(userID, totalAmount); 
        toast.success('Checkout Successful!');
      } catch (error) {
        toast.error('Checkout Failed!');
      }
    }
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + calculateItemPrice(item) * (item.quantity || 1);
  }, 0);

  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center my-4">Checkout</h1>
        <ToastContainer />
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <Row>
            <Col lg={8}>
              <Row>
                {cart.map((item, index) => (
                  <Col key={index} lg={6} sm={12} className="mb-4">
                    <div className="cart-item">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-price">
                        Price: ${calculateItemPrice(item).toFixed(2)}
                      </p>
                      <img
                        src={item.images?.[0] ?? 'path/to/fallback/image.jpg'}
                        alt={item.name}
                        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                      />
                      <div className="cart-item-options">
                        <ListGroup>
                          <ListGroup.Item>
                            <strong>Size:</strong> {item.selectedOptions?.size?.join(', ') || 'N/A'}
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ cursor: 'pointer', color: 'red', marginTop: '10px' }}
                        onClick={() => handleRemoveFromCart(item._id)}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={4}>
              <div className="order-summary">
                <h4>Order Summary</h4>
                <p>Subtotal: ${totalAmount.toFixed(2)}</p>
                <p>Total: ${totalAmount.toFixed(2)}</p>
                <Form.Check 
                  type="radio" 
                  label="Cash on Delivery" 
                  name="paymentMethod" 
                  value="COD" 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                  className="mt-3" 
                />
                <Button
                  variant="success"
                  className="w-100 mt-3 check"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
