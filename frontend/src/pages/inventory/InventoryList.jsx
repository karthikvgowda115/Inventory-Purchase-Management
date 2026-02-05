import React, { useEffect, useState } from "react";
import { getInventory } from "../../services/inventory.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inventory.css";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const res = await getInventory();
      setInventory(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading inventory...</p>;

  return (
    <div className="container mt-4">
      <h2>Inventory Stock</h2>

      {inventory.length === 0 ? (
        <p className="mt-3 text-muted">No stock available</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Item Name</th>
              <th>Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(inv => (
              <tr key={inv.id}>
                <td>{inv.Item?.name || "N/A"}</td>
                <td>{inv.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;
