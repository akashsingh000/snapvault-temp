import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/"

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 60000,
    headers: { 'X-Custom-Header': 'foobar' }
});