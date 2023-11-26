import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_USER = `${API_PATH}/users`;

export const getAllUser = () => {
    return axios.get(`${API_USER}`);
}

export const getUserById = id => {
    return axios.get(`${API_USER}/${id}`);
}

export const updateUser = (id, user) => {
    return axios.put(`${API_USER}/${id}`, user);
}

export const deleteUserById = id => {
    return axios.delete(`${API_USER}/${id}`);
}
