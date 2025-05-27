import React from "react";
import { FaLink } from "react-icons/fa";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t border-gray-800/50 py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <FaLink className="text-indigo-400 text-xl" />
              <span className="text-xl font-light tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                LINKLY
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              The futuristic URL shortener for visionary brands.
            </p>
          </div>

          <div>
            <h4 className="text-gray-300 text-xs font-medium mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-300 text-xs font-medium mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-300 text-xs font-medium mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-300 text-xs font-medium mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FiTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FiGithub className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FiLinkedin className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Linkly Technologies. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
