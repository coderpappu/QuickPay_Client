import React from "react";
import { Link } from "react-router-dom";
import ErrorImg from "../assets/error-img-3.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center  w-full h-screen px-4  dark:bg-dark-card">
      <div className="text-center max-w-[90%] md:max-w-[600px] lg:max-w-[800px] ">
        <img src={ErrorImg} alt="Error Image" className="w-full h-auto mb-8" />

        <h2 className="text-2xl md:text-4xl font-bold">
          Oops! This Page is Not Found.
        </h2>

        <p className="text-lg md:text-xl text-[#6b6b6b] mt-4">
          The page you are trying to reach is currently unavailable. It may have
          been moved or no longer exists.
        </p>

        <Link to="/">
          <button className="px-6 py-3 md:px-8 md:py-4 bg-blue-500 text-white rounded-full mt-6">
            Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
