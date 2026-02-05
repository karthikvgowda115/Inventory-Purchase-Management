import axiosInstance from "../api/axiosInstance";

export const getItems = () => axiosInstance.get("/items");
export const createItem = (data) => axiosInstance.post("/items", data);
export const updateItem = (id, data) => axiosInstance.put(`/items/${id}`, data);
export const deleteItem = (id) => axiosInstance.delete(`/items/${id}`);
