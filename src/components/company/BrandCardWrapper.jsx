import React from "react";

const BrandCardWrapper = ({ children }) => {
  return (
    <div className="w-full h-auto bg-white dark:bg-dark-card  rounded-md ">
      {children}
    </div>
  );
};

export default BrandCardWrapper;
