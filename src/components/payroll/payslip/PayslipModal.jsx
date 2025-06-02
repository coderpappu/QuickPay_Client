import { X } from "lucide-react";
import PreviewPayslipCard from "./PreviewPayslipCard";

const PayslipModal = ({ slipPreview, onClose }) => {
  if (!slipPreview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl transition-all dark:bg-dark-card">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-dark-border-color dark:border-opacity-10">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Employee Payslip
          </h3>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-6rem)] overflow-y-auto p-6">
          <PreviewPayslipCard slipPreview={slipPreview} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default PayslipModal;
