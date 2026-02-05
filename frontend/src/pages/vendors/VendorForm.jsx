import React, { useState, useEffect } from "react";
import { createVendor, updateVendor } from "../../services/vendor.service";

const VendorForm = ({ vendor, onClose }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (vendor) {
      setName(vendor.name);
      setContact(vendor.contact);
      setAddress(vendor.address);
    }
  }, [vendor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !contact) return alert("Name and contact are required");

    const data = { name, contact, address };

    try {
      if (vendor) {
        await updateVendor(vendor.id, data);
      } else {
        await createVendor(data);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save vendor");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4>{vendor ? "Edit Vendor" : "Add Vendor"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Contact</label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default VendorForm;
