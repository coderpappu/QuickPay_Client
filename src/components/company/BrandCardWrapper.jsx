import React from "react";

const BrandCardWrapper = ({ children }) => {
  return (
    <div className="h-auto w-full rounded-md bg-white dark:bg-dark-card">
      {children}
    </div>
  );
};

export default BrandCardWrapper;
