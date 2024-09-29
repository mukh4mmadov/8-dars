import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <header className="bg-blue-500 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-sm italic">My website</span>
          <Link
            to="/"
            className="text-xl font-bold hover:text-gray-300 transition-all duration-300 animate-bounce"
            style={{ margin: "0 auto" }}
          >
            Home
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="text-white hover:text-gray-300 transition-all duration-300 font-semibold"
            >
              REGISTER
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition-all duration-300 font-semibold"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
