import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  getPurchaseOrders,
  approvePurchaseOrder,
  deletePurchaseOrder
} from "../../services/purchaseOrder.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "./po.css";

const POList = () => {
  const [pos, setPOs] = useState([]);
  const navigate = useNavigate();

  // Fetch all purchase orders
  const fetchPOs = async () => {
    try {
      const res = await getPurchaseOrders();
      setPOs(res.data);
    } catch (err) {
      alert("Failed to fetch purchase orders");
    }
  };

  // Approve PO
  const handleApprove = async (id) => {
    if (!window.confirm("Approve this purchase order?")) return;
    try {
      await approvePurchaseOrder(id);
      fetchPOs();
    } catch (err) {
      alert("Failed to approve PO");
    }
  };

  // Delete PO
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this purchase order?")) return;
    try {
      await deletePurchaseOrder(id);
      fetchPOs();
    } catch (err) {
      alert("Failed to delete PO");
    }
  };

  useEffect(() => {
    fetchPOs();
  }, []);

  return (
    <div className="container mt-4">
      {/* HEADER + ADD BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Purchase Orders</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/purchase-orders/create")}
        >
          + Add Purchase Order
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Vendor</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {pos.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No purchase orders found
              </td>
            </tr>
          )}

          {pos.map((po) => (
            <tr key={po.id}>
              <td>{po.id}</td>
              <td>{po.Vendor?.name || "-"}</td>
              <td>₹ {po.totalAmount}</td>
              <td>
                <span
                  className={`badge bg-${
                    po.status === "Approved"
                      ? "success"
                      : po.status === "Completed"
                      ? "secondary"
                      : "warning"
                  }`}
                >
                  {po.status}
                </span>
              </td>
              <td>
                {/* Actions only for Draft or Pending POs */}
                {(po.status === "Draft" || po.status === "Pending") && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleApprove(po.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() =>
                        navigate(`/purchase-orders/edit/${po.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(po.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default POList;
