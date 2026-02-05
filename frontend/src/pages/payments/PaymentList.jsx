import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../../services/payment.service";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data);
    } catch (err) {
      alert("Failed to fetch payments");
    }
  };

  return (
    <div className="container mt-4">
      {/* HEADER + ADD BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Payments</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/payments/create")}
        >
          + Add Payment
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Mode</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No payments found
              </td>
            </tr>
          )}

          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.Vendor?.name || "-"}</td>
              <td>₹ {p.amount}</td>
              <td>{p.mode}</td>
              <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
