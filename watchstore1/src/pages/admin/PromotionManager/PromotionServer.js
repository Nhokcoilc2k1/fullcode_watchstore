import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_PROMO = `${API_PATH}/promotions`;

export const getAll = () => {
    return axios.get(`${API_PROMO}`);
}

export const getPromoById = (id) => {
    return axios.get(`${API_PROMO}/${id}`);
}

export const saveAll = (promo) => {
    return axios.post(`${API_PROMO}`,promo);
}

export const deletePromoById = (id) => {
    return axios.delete(`${API_PROMO}/${id}`);
}

export const updatePromo = (id, category) => {
    return axios.put(`${API_PROMO}/${id}`, category);
}