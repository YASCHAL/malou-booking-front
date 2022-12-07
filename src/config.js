import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://malou-booking-api.onrender.com/api/"
});