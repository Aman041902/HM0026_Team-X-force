import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">Go to Home</Link>
      </div>
    </div>
  );
};

export default Error;
