import React from 'react';
import { Filter, X } from 'lucide-react';

const TaskFilter = ({
  statusOptions,
  priorityOptions,
  selectedStatus,
  selectedPriority,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
  onClearFilters
}) => {
  return (
    <div className="bg-white dark:bg-dark-box border border-dark-box border-opacity-5 rounded-md shadow-sm p-4 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="text-gray-700 dark:text-dark-text-color font-medium flex items-center">
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-10 rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
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
            className="h-10 rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
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
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
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