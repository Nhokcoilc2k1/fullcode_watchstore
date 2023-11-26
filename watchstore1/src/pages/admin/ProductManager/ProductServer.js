import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_PRODUCT = `${API_PATH}/products`;

export const getAllProduct = () => {
    return axios.get(`${API_PRODUCT}`);
}

export const getProductById = id => {
    return axios.get(`${API_PRODUCT}/${id}`);
}

export const saveAll = product => {
    return axios.post(`${API_PRODUCT}`, product);
}

export const deleteProductById = id => {
    return axios.delete(`${API_PRODUCT}/${id}`);
}

export const updateProduct = (id, product) => {
    return axios.put(`${API_PRODUCT}/${id}`, product);
}