const MonthYearSelector = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  className = "",
  compact = false,
}) => {
  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];

  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const selectClasses = compact ? "h-10 px-3 py-2 text-sm" : "h-12 px-4 py-3";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <select
        className={`${selectClasses} w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:border-dark-box dark:bg-dark-box dark:text-dark-text-color`}
        value={month}
        onChange={(e) => onMonthChange(e.target.value)}
        aria-label="Select month"
      >
        <option value="">Select Month</option>
        {monthOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {compact ? option.label.substring(0, 3) : option.label}
          </option>
        ))}
      </select>

      <select
        className={`${selectClasses} w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:border-dark-box dark:bg-dark-box dark:text-dark-text-color`}
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        aria-label="Select year"
      >
        <option value="">Select Year</option>
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearSelector;
