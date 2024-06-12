import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./style/Responsive.css";
import Home from "./pages/Home";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./pages/Login";
import NoPageFound from "./pages/NoPageFound";
import Aboutus from "./pages/Aboutus";
import Register from "./pages/Register";
import ProtectedRoute from "./util/ProtectedRoute";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import CartProvider from "./Context/CartContext";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./dashcomponents/EditProduct";
import AddPro from "./dashcomponents/AddPro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoAccess from "./pages/NoAccess";

function App() {
  return (
    <div>
      <ToastContainer />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:ID" element={<ProductDetails />} />
            <Route path="/add" element={<AddPro />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route
              path="/admin"
              element={
               // <ProtectedRoute adminOnly={true}>
                  <Dashboard />
              //</ProtectedRoute> 
              }
            />
            <Route path="/noAccess" element={<NoAccess />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
