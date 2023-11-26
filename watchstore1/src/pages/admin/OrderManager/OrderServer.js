import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_ORDER = `${API_PATH}/orders`;

export const getAllOrder = () => {
    return axios.get(`${API_ORDER}`);
}

export const getOrderById = id => {
    return axios.get(`${API_ORDER}/by/${id}`);
}

export const deleteOrderById = id => {
    return axios.delete(`${API_ORDER}/${id}`);
}

export const updateOrder = (id, order) => {
    return axios.put(`${API_ORDER}/${id}`, order);
}