import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message !== "User Not found." &&
          data.message !== "Invalid Password!"
        ) {
      
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          navigate("/");
        }

        if (
          data.message === "User Not found." ||
          data.message === "Invalid Password!"
        ) {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <form className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>
        <input
          ref={usernameRef}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="text"
          placeholder="Enter username..."
        />
       
        <div className="relative mb-4">
          <input
            ref={passwordRef}
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password..."
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          onClick={handleLogin}
        >
          LOGIN
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold transition-all duration-300"
          >
            REGISTER
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
