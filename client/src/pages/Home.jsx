import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UrlShortner from "../components/UrlShortner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
      {/* Animated Dark Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 bg-[length:400%_400%] animate-gradient z-0"
        style={{ backgroundSize: "400% 400%" }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      />
      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <UrlShortner />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
