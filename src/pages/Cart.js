import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserID } from '../util/userData';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Cart = () => {
  const { cart, removeFromCart, submitCart, cartID } = useContext(CartContext);
  const [userID, setUserID] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getUserID();
      setUserID(id);
    };
    fetchUserID();
  }, []);

  const handleCheckout = async () => {
    if (!userID || !cartID) {
      // console.log(cartID, "checkout cart")
      toast.error('You must be logged in!');
    } else if (!paymentMethod) {
      toast.error('Please select a payment method!');
    } else {
      try {
        await submitCart(userID);
        toast.success('Checkout Successful!');
      } catch (error) {
        // console.log(error)
        toast.error('Checkout Failed!');
      }
    }
  };
  const calculateItemPrice = (item) => {
    const basePrice = item.price || 0;
    const weightPrice = item.selectedOptions.weights.reduce((total, weight) => {
      const weightOption = item.characteristics.find(char => char.type.toLowerCase() === 'weight')
        ?.options.find(option => option.value === weight);
      return total + (weightOption ? weightOption.price : 0);
    }, 0);
    const colorPrice = item.characteristics.find(char => char.type.toLowerCase() === 'color')
      ?.options.find(option => option.value === item.selectedOptions.color)?.price || 0;
    return basePrice + weightPrice + colorPrice;
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + calculateItemPrice(item) * item.quantity;
  }, 0);

  return (
    <>
    <Header/>
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
                  <div className="cart_item">
                    <h4 className="cart_item_name">{item.name}</h4>
                    <p className="cart_item_price">
                      Price: ${(calculateItemPrice(item)).toFixed(2)}
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
                    <Button
                          variant="danger"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
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
              <Form.Check 
                type="radio" 
                label="Cash on Delivery" 
                name="paymentMethod" 
                value="COD" 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="mt-3" 
              />
            </div>
          </Col>
        </Row>
      )}
    </Container>
    <Footer/>
    </>
  );
};

export default Cart;
