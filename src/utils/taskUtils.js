/**
 * Utility functions for task management
 */

// Get display label for task status
export const getStatusLabel = (status) => {
  switch (status) {
    case 'not_started':
      return 'Not Started';
    case 'in_progress':
      return 'In Progress';
    case 'review':
      return 'Under Review';
    case 'completed':
      return 'Completed';
    default:
      return 'Unknown';
  }
};

// Get CSS color class for task status
export const getStatusColor = (status) => {
  switch (status) {
    case 'not_started':
      return 'bg-slate-200 dark:bg-slate-700';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'review':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-slate-200 dark:bg-slate-700';
  }
};

// Get display label for task priority
export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    case 'urgent':
      return 'Urgent';
    default:
      return 'Unknown';
  }
};

// Get CSS color class for task priority
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'low':
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    case 'medium':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'high':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
    case 'urgent':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
};

// Format date to readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate days remaining until due date
export const calculateDaysRemaining = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get CSS color class for due date status
export const getDueStatusColor = (dueDate) => {
  const daysRemaining = calculateDaysRemaining(dueDate);
  
  if (daysRemaining < 0) {
    return 'text-red-500 dark:text-red-400';
  } else if (daysRemaining === 0) {
    return 'text-amber-500 dark:text-amber-400';
  } else if (daysRemaining <= 2) {
    return 'text-amber-500 dark:text-amber-400';
  } else {
    return 'text-green-500 dark:text-green-400';
  }
};