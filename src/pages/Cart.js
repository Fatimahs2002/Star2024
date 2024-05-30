import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + (item.characteristics?.[0]?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <Container>
      <h1 className="text-center my-4">Shopping Cart</h1>
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
                    <p className="cart_item_price">Price: ${item.characteristics?.[0]?.price ?? 'N/A'}</p>
                    <img
                      src={item.images?.[0] ?? 'path/to/fallback/image.jpg'}
                      alt={item.name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div className="quantity_control">
                      <Button variant="secondary" onClick={() => handleDecrement(item)}>-</Button>
                      <Form.Control
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="quantity_input"
                      />
                      <Button variant="secondary" onClick={() => handleIncrement(item)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
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
              <Button variant="success" className="w-100" onClick={() => alert('Checkout Successful!')}>
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
