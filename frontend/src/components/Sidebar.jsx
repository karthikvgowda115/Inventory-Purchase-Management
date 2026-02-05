import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/vendors">Vendors</Link>
      <Link to="/items">Items</Link>
      <Link to="/purchase-orders">Purchase Orders</Link>
      <Link to="/goods-receipt">Goods Receipt</Link>

      <Link to="/inventory">Inventory</Link>
      <Link to="/payments">Payments</Link>

    </aside>
  );
};

export default Sidebar;
