import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 hidden sm:block py-2 bottom-0 w-full mt-5 text-gray-300 fixed">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:justify-between">
          <p className="text-center text-sm sm:text-left">
            © 2025 <span className="font-semibold text-white">Jop portal</span>.
            All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
