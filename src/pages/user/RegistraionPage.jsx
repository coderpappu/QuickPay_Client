import React from "react";
import { useState } from "react";

import RegistrationImg from "../../assets/registration.png";

import toast, { Toaster } from "react-hot-toast";
import RegistrationForm from "../../components/RegistrationForm";
import Logo from "../../components/Logo";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/api";

const RegistraionPage = () => {
  const navigate = useNavigate();
  const [register, { data, isError, isLoading }] = useRegisterUserMutation();
  // register handler
  const registerHandler = async (
    first_name,
    last_name,
    email,
    phone,
    password
  ) => {
    try {
      const registerResponse = await register({
        first_name,
        last_name,
        email,
        phone,
        password,
      });

      navigate("/login");
    } catch (error) {
      toast.error("Please provide all info correctly.");
    }
  };
  return (
    <div className="w-full h-screen bg-[#FCFCFC]">
      <div className="xl:wrapper-container">
        <Logo />
        <div className="flex flex-wrap bg-[#FCFCFC] justify-around">
          {/* image side  */}
          <div className="w-[80%] sm:w-[50%] md:w-[50%] mt-10  h-screen ">
            <img
              src={RegistrationImg}
              alt="login_image"
              className="w-full h-auto xl:w-[600px]  "
              // xl:ml-[20%]
            />
          </div>

          <RegistrationForm registerHandler={registerHandler} />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default RegistraionPage;
