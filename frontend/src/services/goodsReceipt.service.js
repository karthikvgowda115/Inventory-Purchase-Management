import axiosInstance from "../api/axiosInstance";

export const getGoodsReceipts = () =>
  axiosInstance.get("/goods-receipt");

export const createGoodsReceipt = (data) =>
  axiosInstance.post("/goods-receipt", data);
