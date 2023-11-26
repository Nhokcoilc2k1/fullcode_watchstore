import axios from "axios";

const API_PATH = 'http://localhost:5000/api';
const API_POST = `${API_PATH}/posts`;

export const getAllPost = () => {
    return axios.get(`${API_POST}`);
}

export const getPostById = id => {
    return axios.get(`${API_POST}/${id}`);
}

export const saveAll = post => {
    return axios.post(`${API_POST}`, post);
}

export const deletePostById = id => {
    return axios.delete(`${API_POST}/${id}`);
}

export const updatePost = (id, post) => {
    return axios.put(`${API_POST}/${id}`, post);
}