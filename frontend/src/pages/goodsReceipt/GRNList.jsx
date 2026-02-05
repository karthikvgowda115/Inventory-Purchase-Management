import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";

const GRNList = () => {
  const [grns, setGrns] = useState([]);

  useEffect(() => {
    axiosInstance.get("/goods-receipt").then(res => setGrns(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Goods Receipts</h4>
        <Link to="/goods-receipt/create" className="btn btn-primary">
          + Add GRN
        </Link>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>GRN ID</th>
            <th>PO ID</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {grns.map(grn => (
            <tr key={grn.id}>
              <td>{grn.id}</td>
              <td>{grn.purchaseOrderId}</td>
              <td>{grn.status}</td>
              <td>{new Date(grn.receivedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GRNList;
