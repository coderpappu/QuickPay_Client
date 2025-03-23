import React from "react";

import RegistrationImg from "../../assets/registration.png";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useRegisterUserMutation } from "../../features/api";
import RegistrationForm from "./RegistrationForm";

const RegistraionPage = () => {
  const navigate = useNavigate();
  const [register, { data, isError, isLoading }] = useRegisterUserMutation();
  // register handler
  const registerHandler = async (
    first_name,
    last_name,
    email,
    phone,
    password,
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
    <div className="h-screen">
      <div className="xl:wrapper-container">
        <Logo />
        <div className="mt-24 flex flex-wrap justify-around rounded-md bg-[#FCFCFC] py-4 shadow-sm">
          {/* image side  */}
          <div className="mt-10 h-auto w-[80%] sm:w-[50%] md:w-[50%]">
            <img
              src={RegistrationImg}
              alt="login_image"
              className="h-auto w-full xl:w-[600px]"
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
