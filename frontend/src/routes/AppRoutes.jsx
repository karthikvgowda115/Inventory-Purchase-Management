import { Routes, Route } from "react-router-dom";
import VendorList from "../pages/vendors/VendorList";
import POList from "../pages/purchaseOrders/POList";
import POCreate from "../pages/purchaseOrders/POCreate";
import GRNCreate from "../pages/goodsReceipt/GRNCreate";
import InventoryList from "../pages/inventory/InventoryList";
import PaymentCreate from "../pages/payments/PaymentCreate";
import PaymentList from "../pages/payments/PaymentList";
import ItemList from "../pages/items/ItemList";
import GRNList from "../pages/goodsReceipt/GRNList";










const AppRoutes = () => (
  <Routes>
    <Route path="/vendors" element={<VendorList />} />
    <Route path="/purchase-orders" element={<POList />} />
    <Route path="/purchase-orders/create" element={<POCreate />} />
    <Route path="/goods-receipt" element={<GRNList />} />
    <Route path="/goods-receipt/create" element={<GRNCreate />} />
    <Route path="/inventory" element={<InventoryList />} />
    <Route path="/payments/create" element={<PaymentCreate />} />
    <Route path="/payments" element={<PaymentList />} />
    <Route path="/items" element={<ItemList />} />
  </Routes>
);

export default AppRoutes;
