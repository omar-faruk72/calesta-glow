import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
            <h1 className="text-5xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you are looking for does not exist. <br />
                It might have been moved or deleted.
            </p>
            <Link to="/" className="btn btn-primary">
                🔙 Go Back Home
            </Link>
        </div>
    );
};

export default Error;
