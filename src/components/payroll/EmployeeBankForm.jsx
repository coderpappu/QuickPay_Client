import { AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

const BankAccountForm = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    branchName: initialData?.branchName || "",
    routingNumber: initialData?.routingNumber || "",
    accountNumber: initialData?.accountNumber || "",
    bankName: initialData?.bankName || "",
    isActive: initialData?.isActive || true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "bankName":
        if (!value.trim()) {
          error = "Bank name is required";
        }
        break;
      case "branchName":
        if (!value.trim()) {
          error = "Branch name is required";
        }
        break;
      case "routingNumber":
        if (value.trim() && !/^\d{9}$/.test(value)) {
          error = "Routing number must be 9 digits";
        }
        break;
      case "accountNumber":
        if (!value.trim()) {
          error = "Account number is required";
        } else if (!/^\d{10,16}$/.test(value)) {
          error = "Account number must be between 10 and 16 digits";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  };

  const validateForm = () => {
    const fields = ["bankName", "branchName", "accountNumber"];
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (formData.routingNumber) {
      const error = validateField("routingNumber", formData.routingNumber);
      if (error) {
        newErrors.routingNumber = error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        {},
      );
      setTouched(allTouched);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving bank account data:", formData);
      onClose();
    } catch (error) {
      console.error("Error saving bank account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bangladeshBanks = [
    "Sonali Bank Ltd.",
    "Janata Bank Ltd.",
    "Agrani Bank Ltd.",
    "Rupali Bank Ltd.",
    "Dutch-Bangla Bank Ltd.",
    "BRAC Bank Ltd.",
    "Eastern Bank Ltd.",
    "Islami Bank Bangladesh Ltd.",
    "Prime Bank Ltd.",
    "City Bank Ltd.",
    "Standard Chartered Bank",
    "HSBC Bangladesh",
    "Other",
  ];

  const renderFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return null;

    if (errors[fieldName]) {
      return (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <AlertCircle className="h-4 w-4 text-red-400" />
        </div>
      );
    }

    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      </div>
    );
  };

  const inputStyles = `w-full rounded-md border-[0.5px] bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500`;
  const errorInputStyles = `border-red-200 bg-red-50 text-red-900 placeholder:text-red-200 focus:border-red-400 focus:ring-red-400 dark:border-red-800 dark:bg-red-900/10`;
  const successInputStyles = `border-emerald-200 bg-emerald-50/50 focus:border-emerald-400 focus:ring-emerald-400 dark:border-emerald-800 dark:bg-emerald-900/10`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2 space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Bank Name*
          </label>
          <div className="relative">
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputStyles} ${
                errors.bankName && touched.bankName
                  ? errorInputStyles
                  : touched.bankName && !errors.bankName
                    ? successInputStyles
                    : "border-gray-200"
              }`}
            >
              <option value="">Select a bank</option>
              {bangladeshBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {renderFieldStatus("bankName")}
          </div>
          {errors.bankName && touched.bankName && (
            <p className="text-xs text-red-500">{errors.bankName}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Branch Name*
          </label>
          <div className="relative">
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., Gulshan Branch"
              className={`${inputStyles} ${
                errors.branchName && touched.branchName
                  ? errorInputStyles
                  : touched.branchName && !errors.branchName
                    ? successInputStyles
                    : "border-gray-200"
              }`}
            />
            {renderFieldStatus("branchName")}
          </div>
          {errors.branchName && touched.branchName && (
            <p className="text-xs text-red-500">{errors.branchName}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Routing Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="routingNumber"
              value={formData.routingNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., 160274589"
              maxLength={9}
              className={`${inputStyles} font-mono ${
                errors.routingNumber && touched.routingNumber
                  ? errorInputStyles
                  : touched.routingNumber && !errors.routingNumber
                    ? successInputStyles
                    : "border-gray-200"
              }`}
            />
            {renderFieldStatus("routingNumber")}
          </div>
          {errors.routingNumber && touched.routingNumber ? (
            <p className="text-xs text-red-500">{errors.routingNumber}</p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Optional: 9-digit code identifying the specific branch
            </p>
          )}
        </div>

        <div className="col-span-2 space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Account Number*
          </label>
          <div className="relative">
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., 1005789456123"
              className={`${inputStyles} font-mono ${
                errors.accountNumber && touched.accountNumber
                  ? errorInputStyles
                  : touched.accountNumber && !errors.accountNumber
                    ? successInputStyles
                    : "border-gray-200"
              }`}
            />
            {renderFieldStatus("accountNumber")}
          </div>
          {errors.accountNumber && touched.accountNumber && (
            <p className="text-xs text-red-500">{errors.accountNumber}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Account
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3 border-t border-gray-100 pt-4 dark:border-gray-800">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Saving...
            </>
          ) : initialData?.id ? (
            "Update"
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default BankAccountForm;
