import axios from 'axios';
import { nprogress } from './utils';

const API_ROOT = "http://localhost:3000/api/";

export const http = axios.create({
    baseURL: API_ROOT,
    timeout: 10000,
});

const handleError = (error) => {
    nprogress.done();
    console.error(error);
    return Promise.reject(error);
}; 

http.interceptors.request.use(request => {
    nprogress.start();
    return request;
}, handleError);

http.interceptors.response.use(response => {
    nprogress.done();
    return response;
}, handleError);

export const records = {
    index: (params) => http.get("records", { params }),
    get: (id, params) => http.get(`records/${id}`, { params }),
    update: (id, data, params) => http.put(`records/${id}`, data, { params })
};