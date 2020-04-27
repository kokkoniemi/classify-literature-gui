import axios from 'axios';

const API_ROOT = "http://localhost:3000/api/";

export const http = axios.create({
    baseURL: API_ROOT,
    timeout: 10000,
});

export const records = {
    index: (params) => http.get("records", { params }),
    get: (id, params) => http.get(`records/${id}`, { params }),
    update: (id, data, params) => http.put(`records/${id}`, data, { params })
};