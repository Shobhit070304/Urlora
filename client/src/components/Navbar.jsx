import React, { useContext, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const randomSeed = user?.name + Math.floor(Math.random() * 10000);
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;

  return (
    <nav className="w-full flex items-center justify-between px-[10%] py-4 bg-zinc-900/70 backdrop-blur-lg border-b border-zinc-700 shadow-sm">
      <div className="flex items-center gap-2 text-white text-2xl font-bold tracking-wide">
        <Sparkles className="text-purple-500" size={22} />
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Urlora
        </span>
      </div>
      {user ? (
        <div className="flex gap-5 text-zinc-300 text-sm">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />

          <Link
            to="/"
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:bg-red-700 h-10 text-white px-4 py-2 rounded-md transition-all duration-300"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="gap-5 text-zinc-300 text-sm">
          <Link
            to="/auth"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md transition-all duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
