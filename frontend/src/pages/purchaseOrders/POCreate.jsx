import React, { useEffect, useState } from "react";
import { createPurchaseOrder } from "../../services/purchaseOrder.service";
import axiosInstance from "../../api/axiosInstance";
import "./po.css";

const POCreate = () => {
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [poItems, setPoItems] = useState([]);

  useEffect(() => {
    axiosInstance.get("/vendors").then(res => setVendors(res.data));
    axiosInstance.get("/items").then(res => setItems(res.data));
  }, []);

  const addItem = () => {
    setPoItems([...poItems, { itemId: "", quantity: 1, rate: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...poItems];
    updated[index][field] = value;
    setPoItems(updated);
  };

  const submitPO = async () => {
    if (!vendorId || poItems.length === 0) {
      return alert("Vendor and items required");
    }

    try {
      await createPurchaseOrder({
        vendorId,
        items: poItems
      });
      alert("Purchase Order created");
      setVendorId("");
      setPoItems([]);
    } catch (err) {
      alert("Failed to create PO");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Purchase Order</h2>

      <div className="mb-3">
        <label>Vendor</label>
        <select className="form-select" value={vendorId} onChange={e => setVendorId(e.target.value)}>
          <option value="">Select Vendor</option>
          {vendors.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <h5>Items</h5>
      {poItems.map((item, index) => (
        <div className="row mb-2" key={index}>
          <div className="col">
            <select
              className="form-select"
              onChange={e => updateItem(index, "itemId", e.target.value)}
            >
              <option value="">Item</option>
              {items.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Qty"
              onChange={e => updateItem(index, "quantity", e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Rate"
              onChange={e => updateItem(index, "rate", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-secondary me-2" onClick={addItem}>
        Add Item
      </button>
      <button className="btn btn-success" onClick={submitPO}>
        Submit PO
      </button>
    </div>
  );
};

export default POCreate;
