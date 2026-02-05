import React, { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../../services/vendor.service";
import VendorForm from "./VendorForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./vendor.css";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editVendor, setEditVendor] = useState(null);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch vendors");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await deleteVendor(id);
        fetchVendors();
      } catch (err) {
        console.error(err);
        alert("Failed to delete vendor");
      }
    }
  };

  const handleEdit = (vendor) => {
    setEditVendor(vendor);
    setShowForm(true);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Vendors</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Vendor
        </button>
      </div>

      {showForm && (
        <VendorForm
          vendor={editVendor}
          onClose={() => {
            setShowForm(false);
            setEditVendor(null);
            fetchVendors();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.contact}</td>
              <td>{v.address}</td>
              <td>{v.balance}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(v)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
