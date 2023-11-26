import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_CATEGORY = `${API_PATH}/categorys`;

export const getAllCategory = () => {
    return axios.get(`${API_CATEGORY}`);
}

export const getCategoryById = id => {
    return axios.get(`${API_CATEGORY}/${id}`);
}

export const saveAll = category => {
    return axios.post(`${API_CATEGORY}`, category);
}

export const deleteCategoryById = id => {
    return axios.delete(`${API_CATEGORY}/${id}`);
}

export const updateCategory = (id, category) => {
    return axios.put(`${API_CATEGORY}/${id}`, category);
}