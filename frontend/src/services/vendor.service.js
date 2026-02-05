import axiosInstance from "../api/axiosInstance";

export const getVendors = () => axiosInstance.get("/vendors");

export const createVendor = (data) => axiosInstance.post("/vendors", data);

export const updateVendor = (id, data) => axiosInstance.put(`/vendors/${id}`, data);

export const deleteVendor = (id) => axiosInstance.delete(`/vendors/${id}`);
