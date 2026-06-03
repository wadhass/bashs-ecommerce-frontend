import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;