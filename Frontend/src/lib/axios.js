import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chatbotrealtime-production.up.railway.app/api",
    withCredentials: true,

});