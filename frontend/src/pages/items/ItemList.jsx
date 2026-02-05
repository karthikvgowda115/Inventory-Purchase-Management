import React, { useState, useEffect } from "react";
import { getItems, deleteItem } from "../../services/item.service";
import ItemForm from "./ItemForm";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div className="container mt-4">

      {/* HEADER ROW */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Items</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
        >
          + Add Item
        </button>
      </div>

      {showForm && (
        <ItemForm
          item={editingItem}
          onClose={() => {
            setShowForm(false);
            fetchItems();
          }}
        />
      )}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>₹ {item.price}</td>
              <td>{item.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ItemList;
