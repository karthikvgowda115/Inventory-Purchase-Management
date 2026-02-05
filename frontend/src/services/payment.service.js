import axiosInstance from "../api/axiosInstance";

export const getPayments = () =>
  axiosInstance.get("/payments");

export const createPayment = (data) =>
  axiosInstance.post("/payments", data);
