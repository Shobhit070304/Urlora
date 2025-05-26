import React from "react";

function Footer() {
  return (
    <footer className="mt-16 w-full px-4 py-4 bg-zinc-900/70 backdrop-blur-md border-t border-zinc-700 text-zinc-400 text-xs flex flex-col sm:flex-row justify-between items-center">
      <span>
        © 2025 <span className="text-purple-400 font-semibold">Urlora</span>.
        Built for the next-gen web 🌐
      </span>
      <span className="opacity-50 mt-2 sm:mt-0">
        Stay Short, Stay Futuristic
      </span>
    </footer>
  );
}

export default Footer;
