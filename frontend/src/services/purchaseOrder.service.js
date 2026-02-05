import axiosInstance from "../api/axiosInstance";

export const getPurchaseOrders = () =>
  axiosInstance.get("/purchase-orders");

export const createPurchaseOrder = (data) =>
  axiosInstance.post("/purchase-orders", data);

export const approvePurchaseOrder = (id) =>
  axiosInstance.patch(`/purchase-orders/approve/${id}`);


export const deletePurchaseOrder = (id) =>
  axiosInstance.delete(`/purchase-orders/${id}`);