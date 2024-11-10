import { Skeleton } from "@mui/material"; // Assuming you're using Material-UI for skeletons
import React from "react";
import BrandCardWrapper from "../components/company/BrandCardWrapper";

const CardSkeleton = () => {
  return (
    <BrandCardWrapper>
      <div className="px-6 py-3">
        {/* header  */}
        <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
          <div className="dark:text-white w-[35%]">
            <Skeleton variant="text" width="60%" />
          </div>

          <div className="dark:text-white w-[15%]">
            <Skeleton variant="text" width="40%" />
          </div>
        </div>

        {/* body  */}
        <div className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
          <div className="dark:text-white w-[35%]">
            <Skeleton variant="text" width="80%" />
          </div>
          <div className="dark:text-white w-[15%]">
            <div className="flex flex-wrap justify-start gap-2">
              <Skeleton variant="rectangular" width={32} height={32} />
              <Skeleton variant="rectangular" width={32} height={32} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-between text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
          <div className="dark:text-white w-[35%]">
            <Skeleton variant="text" width="80%" />
          </div>

          <div className="dark:text-white w-[15%]">
            <div className="flex flex-wrap justify-start gap-2">
              <Skeleton variant="rectangular" width={32} height={32} />
              <Skeleton variant="rectangular" width={32} height={32} />
            </div>
          </div>
        </div>
      </div>
    </BrandCardWrapper>
  );
};

export default CardSkeleton;
