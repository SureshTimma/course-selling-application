import React from "react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="text-center px-6 py-10 bg-white rounded-2xl shadow-xl max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-orange-600 mb-4">404</h1>
        <p className="text-xl text-gray-800 mb-2 font-semibold">Page Not Found</p>
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn’t exist.</p>
        <a href="/" className="inline-block bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
