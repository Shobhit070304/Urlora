// src/Auth.jsx
import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider, githubProvider } from "../utils/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const { user, login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const userData = await signInWithPopup(auth, googleProvider);
    login(userData.user);
    navigate("/home");
  };

  const loginWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => console.log(result.user))
      .catch((err) => console.error(err));
  };

  const randomSeed = user?.name + Math.floor(Math.random() * 10000);
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <Link
        className="absolute top-4 left-4 text-white bg-black hover:bg-gray-700 flex items-center px-3 py-2 rounded-md gap-2"
        to={user ? "/home" : "/"}
      >
        {" "}
        <ArrowLeft /> Back
      </Link>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4">
        {user ? (
          <>
            {" "}
            <h2 className="text-2xl font-semibold text-center mb-2">
              Login / Signup
            </h2>
            <button
              onClick={loginWithGoogle}
              className="bg-gray-300 cursor-pointer flex gap-4 items-center justify-center hover:bg-gray-400 text-black font-medium py-2 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.4-1.5-34.1-4.4-50.3H272v95.1h146.9c-6.4 34.4-25.6 63.6-54.6 83.1v68h88c51.4-47.3 81.2-117.1 81.2-195.9z"
                  fill="#4285F4"
                />
                <path
                  d="M272 544.3c73.7 0 135.6-24.5 180.8-66.5l-88-68c-24.5 16.4-55.8 26-92.8 26-71 0-131.1-47.9-152.7-112.1H29v70.4c45.3 89.3 137.6 150.2 243 150.2z"
                  fill="#34A853"
                />
                <path
                  d="M119.3 323.7c-10.8-32.3-10.8-67.1 0-99.4V154h-90.4C4.1 191.6-8.7 233.2 0 274.3c8.7 41.1 29.8 78.3 58.9 105.5l90.4-56.1z"
                  fill="#FBBC05"
                />
                <path
                  d="M272 107.7c39.9 0 75.8 13.7 104.2 40.7l78-78C415.6 26.3 353.7 0 272 0 166.6 0 74.3 60.9 29 150.2l90.4 69.4c21.6-64.2 81.7-111.9 152.6-111.9z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </button>
            <button
              onClick={loginWithGithub}
              className="bg-gray-800 cursor-pointer flex gap-4 items-center justify-center hover:bg-gray-900 text-white font-medium py-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.9 2.3-1.3.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6a10.6 10.6 0 0 0 7.9-10.8C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              Login with GitHub
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-26 h-26 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />

            {user && (
              <h2 className="text-2xl font-semibold text-center mb-2">
                {" "}
                "Welcome, " + {user.name}
              </h2>
            )}
            <button
              onClick={logout}
              className="bg-red-400 cursor-pointer flex gap-4 w-full items-center justify-center hover:bg-red-500 text-white font-medium py-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
