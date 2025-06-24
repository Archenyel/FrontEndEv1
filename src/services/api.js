import axios from "axios";

const api = axios.create({
baseURL: "http://10.13.1.3:8001/api",
});

export default api;