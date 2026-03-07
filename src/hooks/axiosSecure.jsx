import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001', 
    withCredentials: true, 
});

const axiosSecure = () => {
    return axiosInstance;
};

export default axiosSecure;