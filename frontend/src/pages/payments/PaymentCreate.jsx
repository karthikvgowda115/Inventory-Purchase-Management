import React, { useEffect, useState } from "react";
import { createPayment } from "../../services/payment.service";
import axiosInstance from "../../api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "./payment.css";

const PaymentCreate = () => {
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    axiosInstance.get("/vendors").then(res => setVendors(res.data));
  }, []);

  const submitPayment = async () => {
    if (!vendorId || !amount || !mode) {
      return alert("Vendor, amount and mode are required");
    }

    try {
      await createPayment({
        vendorId,
        amount,
        mode,
        remarks
      });

      alert("Payment recorded successfully");
      setVendorId("");
      setAmount("");
      setMode("");
      setRemarks("");
    } catch (err) {
      alert("Failed to record payment");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Vendor Payment</h2>

      <div className="mb-3">
        <label>Vendor</label>
        <select
          className="form-select"
          value={vendorId}
          onChange={e => setVendorId(e.target.value)}
        >
          <option value="">Select Vendor</option>
          {vendors.map(v => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Amount</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Payment Mode</label>
        <select
          className="form-select"
          value={mode}
          onChange={e => setMode(e.target.value)}
        >
          <option value="">Select Mode</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Remarks</label>
        <textarea
          className="form-control"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={submitPayment}>
        Submit Payment
      </button>
    </div>
  );
};

export default PaymentCreate;
