import axios from 'axios';
import React from 'react';

const axiosSecure = () => {
    const instance = axios.create({
        // baseURL: 'http://localhost:3000',
        baseURL: 'http://localhost:5001'
    })
    return instance;
};

export default axiosSecure;