import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_BRAND = `${API_PATH}/brands`;

export const getAllBrand = () => {
    return axios.get(`${API_BRAND}`);
}

export const getBrandById = id => {
    return axios.get(`${API_BRAND}/${id}`);
}

export const saveAll = brand => {
    return axios.post(`${API_BRAND}`, brand);
}

export const deleteBrandById = id => {
    return axios.delete(`${API_BRAND}/${id}`);
}

export const updateBrand = (id, brand) => {
    return axios.put(`${API_BRAND}/${id}`, brand);
}