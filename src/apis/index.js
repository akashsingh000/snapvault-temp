import axios from "axios";

const apiUrl = "http://52.0.205.252:2004/api/"

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 60000,
    headers: { 'X-Custom-Header': 'foobar' }
});