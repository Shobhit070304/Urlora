import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UrlShortner from "../components/UrlShortner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuturisticBackground from "../components/Background";

const Home = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
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
      {/* Futuristic 3D Background */}
      <FuturisticBackground />

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
