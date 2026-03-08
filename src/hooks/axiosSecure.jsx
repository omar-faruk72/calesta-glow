import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://calesta-beauty-server.vercel.app', 
    withCredentials: true, 
});

const axiosSecure = () => {
    return axiosInstance;
};

export default axiosSecure;