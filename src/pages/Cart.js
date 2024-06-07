import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserID } from '../util/userData';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, submitCart, cartID } = useContext(CartContext);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getUserID();
      setUserID(id);
    };
    fetchUserID();
  }, []);

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.product, item.quantity - 1, item.selectedOptions);
    } else {
      removeFromCart(item.product, item.selectedOptions);
    }
  };

  const handleIncrement = (item) => {
    updateQuantity(item.product, item.quantity + 1, item.selectedOptions);
  };

  const handleCheckout = async () => {
    if (!userID || !cartID) {
      toast.error('You must be logged in!');
    } else {
      try {
        await submitCart(userID, cartID);
        toast.success('Checkout Successful!');
      } catch (error) {
        toast.error('Checkout Failed!');
      }
    }
  };

  const totalAmount = cart.reduce((total, item) => {
    const itemPrice = item.selectedOptions.weights.reduce((price, weight) => {
      const weightOption = item.characteristics.find(char => char.type.toLowerCase() === 'size')
        ?.options.find(option => option.value === weight);
      return price + (weightOption ? weightOption.price : 0);
    }, 0);
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <Container>
      <h1 className="text-center my-4">Checkout </h1>
      <ToastContainer />
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Row>
          <Col lg={8}>
            <Row>
              {cart.map((item, index) => (
                <Col key={index} lg={6} sm={12} className="mb-4">
                  <div className="cart_item">
                    <h4 className="cart_item_name">{item.name}</h4>
                    <p className="cart_item_price">
                      Price: ${item.selectedOptions.weights.reduce((price, weight) => {
                        const weightOption = item.characteristics.find(char => char.type.toLowerCase() === 'size')
                          ?.options.find(option => option.value === weight);
                        return price + (weightOption ? weightOption.price : 0);
                      }, 0)}
                    </p>
                    <img
                      src={item.images?.[0] ?? 'path/to/fallback/image.jpg'}
                      alt={item.name}
                      style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    />
                    <div className="cart_item_options">
                      <ListGroup>
                        <ListGroup.Item><strong>Weights:</strong> {item.selectedOptions.weights.join(', ')}</ListGroup.Item>
                        <ListGroup.Item><strong>Color:</strong> {item.selectedOptions.color}</ListGroup.Item>
                      </ListGroup>
                    </div>
                    <div className="quantity_control mt-3 d-flex">
                      <Button variant="secondary" onClick={() => handleDecrement(item)}>-</Button>
                      <Form.Control
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="quantity_input mx-2"
                        style={{ width: '50px', textAlign: 'center' }}
                      />
                      <Button variant="secondary" onClick={() => handleIncrement(item)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => removeFromCart(item.product, item.selectedOptions)} className="mt-3">
                      Remove
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={4}>
            <div className="order_summary">
              <h4>Order Summary</h4>
              <p>Subtotal: ${totalAmount.toFixed(2)}</p>
              <p>Total: ${totalAmount.toFixed(2)}</p>
              <Button variant="success" className="w-100" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
