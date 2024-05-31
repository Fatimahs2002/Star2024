import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./pages/Login";
import NoPageFound from "./pages/NoPageFound";
import Aboutus from "./pages/Aboutus";
import Register from "./pages/Register";
import ProtectedRoute from "./util/ProtectedRoute";
import Cart from "./pages/Cart";
import User from "./pages/User";
import CartProvider from "./Context/CartContext";

function App() {
  return (
    <div>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
