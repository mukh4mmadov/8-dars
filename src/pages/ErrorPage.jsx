import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6 text-gray-700">Oops! Page not found.</p>
      <Link
        to="/"
        className="text-lg text-blue-500 underline hover:text-blue-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
