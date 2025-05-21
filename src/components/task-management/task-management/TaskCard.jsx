import { Clock, Trash2 } from "lucide-react";
import {
  calculateDaysRemaining,
  getDueStatusColor,
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
  getStatusLabel,
} from "../../../utils/taskUtils";
const TaskCard = ({ task, onClick, onDeleteTask }) => {
  const daysRemaining = calculateDaysRemaining(task.dueDate);
  const dueStatusColor = getDueStatusColor(task.dueDate);

  return (
    <div className="mb-3 cursor-pointer rounded-md border border-dark-box border-opacity-5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-dark-box">
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3
            className="font-medium text-gray-900 dark:text-dark-text-color"
            onClick={() => onClick(task)}
          >
            {task.title}
          </h3>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}
          >
            {getPriorityLabel(task.priority)}
          </span>

          <span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (typeof onDeleteTask === "function") {
                  onDeleteTask(task.id);
                }
              }}
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </span>
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {task.description}
        </p>

        <div
          className="mt-4 flex items-center justify-between"
          onClick={() => onClick(task)}
        >
          <div className="flex items-center">
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
              {task.assignedToId?.image ? (
                <img
                  src={task.assignedTo?.image}
                  alt={task.assignedTo?.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                task.assignedTo?.name.charAt(0).toUpperCase()
              )}
            </div>
            <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
              {task.assignedTo?.name}
            </span>
          </div>

          <div className={`flex items-center ${dueStatusColor}`}>
            <Clock size={14} className="mr-1" />
            <span className="text-xs">
              {daysRemaining < 0
                ? `Overdue by ${Math.abs(daysRemaining)} days`
                : daysRemaining === 0
                  ? "Due today"
                  : `${daysRemaining} days left`}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1.5 rounded-full bg-button-bg dark:bg-button-bg"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{task.progress}% Complete</span>
            <span
              className={`${getStatusColor(task.status)} rounded-full px-2 py-0.5`}
            >
              {getStatusLabel(task.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
