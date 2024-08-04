import React from "react";
import QuickPayLogo from "../assets/quickPayLogoWhite.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="w-[200px] h-auto] py-2">
      <Link to="/">
        <img src={QuickPayLogo} alt="Quick Pay Logo" />
      </Link>
    </div>
  );
};

export default Logo;
