import axiosInstance from "../api/axiosInstance";

export const getInventory = () =>
  axiosInstance.get("/inventory");
