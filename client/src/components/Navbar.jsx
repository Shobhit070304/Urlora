import React from "react";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900/70 backdrop-blur-lg border-b border-zinc-700 shadow-sm">
      <div className="flex items-center gap-2 text-white text-2xl font-bold tracking-wide">
        <Sparkles className="text-purple-500" size={22} />
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Urlora
        </span>
      </div>
      <div className="hidden md:flex gap-5 text-zinc-300 text-sm">
        <a href="#" className="hover:text-white transition-all duration-300">
          Home
        </a>
        <a href="#" className="hover:text-white transition-all duration-300">
          About
        </a>
        <a href="#" className="hover:text-white transition-all duration-300">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
