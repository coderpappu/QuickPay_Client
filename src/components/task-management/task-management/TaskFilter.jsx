import { Filter, X } from "lucide-react";

const TaskFilter = ({
  statusOptions,
  priorityOptions,
  selectedStatus,
  selectedPriority,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
  onClearFilters,
}) => {
  return (
    <div className="mb-4 rounded-md border border-dark-box border-opacity-5 bg-white p-4 shadow-sm dark:bg-dark-box">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div className="flex items-center font-medium text-gray-700 dark:text-dark-text-color">
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
        </div>

        <div className="w-full flex-1 md:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-card dark:text-dark-text-color"
          />
        </div>

        <div className="flex w-full flex-wrap gap-3 md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-10 rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-card dark:text-dark-text-color"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="h-10 rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-card dark:text-dark-text-color"
          >
            <option value="">All Priorities</option>
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {(selectedStatus || selectedPriority || searchQuery) && (
            <button
              onClick={onClearFilters}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <X size={16} className="mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
