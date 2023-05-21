import React from 'react';
import { CgSmileSad } from "react-icons/cg";
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <CgSmileSad className="h-20 w-20 text-gray-600 mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404 Not Found</h1>
          <p className="text-lg text-gray-600 mb-6">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-black text-white font-semibold py-2 px-4 rounded-md shadow-xl"
          >
            Go back to homepage
          </Link>
        </div>
    );
};

export default ErrorPage;