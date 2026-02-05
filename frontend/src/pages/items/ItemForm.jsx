import React, { useState, useEffect } from "react";
import { createItem, updateItem } from "../../services/item.service";

const ItemForm = ({ item, onClose }) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setSku(item.sku);
      setPrice(item.price);
      setDescription(item.description || "");
      setStock(item.stock || 0);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !sku || !price) return alert("Name, SKU, and Price are required");

    const data = { name, sku, price, description, stock };

    try {
      if (item) await updateItem(item.id, data);
      else await createItem(data);
      onClose();
    } catch (err) {
      alert("Failed to save item");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4>{item ? "Edit Item" : "Add Item"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>SKU</label>
          <input className="form-control" value={sku} onChange={e => setSku(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input type="number" className="form-control" value={stock} onChange={e => setStock(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ItemForm;
