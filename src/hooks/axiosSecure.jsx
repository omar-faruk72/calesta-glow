import axios from 'axios';
import React from 'react';

const axiosSecure = () => {
    const instance = axios.create({
        // baseURL: 'http://localhost:3000',
        baseURL: 'https://calesta-beauty-server.vercel.app'
    })
    return instance;
};

export default axiosSecure;