import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  useGetbrandQuery,
  useGetEmployeeDetailsQuery,
} from "../../../features/api";
import { DateConverterFromUTC } from "../../../utils/Converter";
import BonusSlipDownloadButton from "./BonusSlipDownloadButton";

const PreviewBonusSlip = ({ slipPreview }) => {
  const companyId = useSelector((state) => state.company.companyId);

  const bonusSlipRef = useRef(null);
  const { data: brandDetails } = useGetbrandQuery(companyId);

  const id = slipPreview?.employee_id;

  const { data: employeeData } = useGetEmployeeDetailsQuery(id);

  return (
    <div>
      {/* Download Bonus Slip Button */}
      <div className="mb-4 flex justify-end">
        <BonusSlipDownloadButton
          bonusSlipRef={bonusSlipRef}
          employeeData={employeeData?.data || {}}
          generateDate={slipPreview?.date}
        />
      </div>
      <div
        ref={bonusSlipRef}
        className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-md dark:bg-dark-box"
      >
        {/* Header */}
        <div className="mx-auto mb-4 h-auto w-[150px] text-center text-xl font-bold">
          <img src={brandDetails?.data?.lightImageUrl} alt="brand logo" />
        </div>
        <div className="mb-2 flex justify-between text-sm">
          <div className="item flex flex-col flex-wrap gap-1">
            <p>
              <strong>ID No : </strong> {slipPreview?.employeeId}
            </p>
            <p>
              <strong>Name :</strong> {slipPreview?.name}
            </p>
            <p>
              <strong>Department : </strong>{" "}
              {employeeData?.data?.EmployeeDepartment?.[0]?.department?.name}
            </p>
            <p>
              <strong>Designation : </strong>{" "}
              {employeeData?.data?.EmployeeDesignation[0]?.designation?.name}
            </p>
            <p>
              <strong>Section : </strong>{" "}
              {employeeData?.data?.EmployeeSection?.[0]?.section?.name}
            </p>
          </div>
          <div className="item flex flex-col flex-wrap gap-1 text-right">
            <p>
              <strong>Status : </strong> {slipPreview?.status}
            </p>
            <p>
              <strong>Payment Date : </strong>{" "}
              {DateConverterFromUTC(slipPreview?.payment_date)}
            </p>

            <p>
              <strong>Month :</strong> {slipPreview?.date}
            </p>
          </div>
        </div>

        {/* Earnings and Deductions Table */}
        <div className="mb-4 border text-sm">
          {/* Header Row */}
          <div className="grid grid-cols-2 border-b font-bold">
            <div className="border-r p-2">Bonus</div>
            <div className="border-r p-2">Amount</div>
          </div>
          {/* Dynamic Rows */}
          {/* Dynamic Rows */}

          <div className="grid grid-cols-2 border-b">
            <div className="border-r p-2">{slipPreview?.bonus_name}</div>
            <div className="border-r p-2">{slipPreview?.amount}</div>
          </div>
        </div>

        {/* Net Amount */}
        <div className="flex justify-end text-lg font-bold">
          <p>Total Bonus : {Math.round(slipPreview?.amount)}</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewBonusSlip;
