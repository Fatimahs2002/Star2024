import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "sabon", weight: "2" },
    { id: 2, name: "pril", weight: "1.5" },
    { id: 3, name: "shampoo", weight: "0.5" },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductWeight, setNewProductWeight] = useState("");

  const handleDelete = (id) => {
    toast(
      <div>
        Are you sure you want to delete this product?
        <div className="mt-2 d-flex gap-3 aline-center">
          <Button variant="danger" onClick={() => confirmDelete(id)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => toast.dismiss()}>
            No
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    toast.dismiss();
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setNewProductName(product.name);
    setNewProductWeight(product.weight);
  };

  const handleSave = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, name: newProductName, weight: newProductWeight }
          : product
      )
    );
    setEditingProduct(null);
    setNewProductName("");
    setNewProductWeight("");
  };

  return (
    <div>
      <ToastContainer />
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Weight</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProduct === product.id ? (
                  <Form.Control
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProduct === product.id ? (
                  <Form.Control
                    type="text"
                    value={newProductWeight}
                    onChange={(e) => setNewProductWeight(e.target.value)}
                  />
                ) : (
                  product.weight
                )}
              </td>
              <td>
                {editingProduct === product.id ? (
                  <Button
                    variant="success"
                    onClick={() => handleSave(product.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button variant="warning" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
