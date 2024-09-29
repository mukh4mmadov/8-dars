import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    let isValid = true;

    if (usernameRef.current.value.length < 3) {
      alert("username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.borderColor = "red";
      isValid = false;
    } else {
      usernameRef.current.style.borderColor = "";
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      emailRef.current.style.borderColor = "red";
      isValid = false;
    } else {
      emailRef.current.style.borderColor = "";
    }

    if (passwordRef.current.value !== rePasswordRef.current.value) {
      alert("Parollar mos emas");
      passwordRef.current.style.borderColor = "red";
      rePasswordRef.current.style.borderColor = "red";
      passwordRef.current.focus();
      isValid = false;
    } else {
      passwordRef.current.style.borderColor = "";
      rePasswordRef.current.style.borderColor = "";
    }

    return isValid;
  }

  function handleRegister(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User registered successfully!") {
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          rePasswordRef.current.value = "";

          navigate("/login");
        }

        if (
          data.message === "Failed! Username is already in use!" ||
          data.message === "Failed! Email is already in use!"
        ) {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Register
        </h2>
        <input
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ref={usernameRef}
          type="text"
          placeholder="Enter UserName..."
        />
        <input
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ref={emailRef}
          type="email"
          placeholder="Enter Email..."
        />
        <input
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ref={passwordRef}
          type="password"
          placeholder="Enter password..."
        />
        <input
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ref={rePasswordRef}
          type="password"
          placeholder="Enter again password..."
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold transition-all duration-300"
          >
            LOGIN
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
