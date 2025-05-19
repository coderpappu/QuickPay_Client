import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useGetUserQuery } from "../../../features/api.js";
import { getStatusColor, getStatusLabel } from "../../../utils/taskUtils.js";

const TaskProgress = ({
  task,
  assignedTo,
  onProgressUpdate,
  onStatusUpdate,
}) => {
  const { data: user } = useGetUserQuery();
  const [progress, setProgress] = useState(task.progress);
  const [isEditing, setIsEditing] = useState(false);

  const isAssignedUser = user?.data?.id === assignedTo;
  const isCompleted = task.status === "COMPLETED";

  const handleProgressChange = (e) => {
    let newProgress = parseInt(e.target.value, 10);

    // If employee is assigned user, cap at 80%
    if (isAssignedUser && newProgress > 80) {
      newProgress = 80;
    }

    setProgress(newProgress);
  };

  const handleProgressSubmit = () => {
    onProgressUpdate(progress);
    setIsEditing(false);
  };

  // Status options: assigned user can't access "COMPLETED"
  const statusOptions = isAssignedUser
    ? ["NOT_STARTED", "IN_PROGRESS", "REVIEW"]
    : ["NOT_STARTED", "IN_PROGRESS", "REVIEW", "COMPLETED"];

  const isActionDisabled = isAssignedUser && isCompleted;

  return (
    <div className="mb-4 rounded-md border border-dark-box border-opacity-5 bg-white p-4 shadow-sm dark:bg-dark-box">
      <h3 className="mb-4 font-medium text-gray-900 dark:text-dark-text-color">
        Task Progress
      </h3>

      {/* Status Section */}
      <div className="mb-4">
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Current Status
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}
          >
            {getStatusLabel(task.status)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => {
                if (!isActionDisabled) onStatusUpdate(status);
              }}
              disabled={isActionDisabled}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                task.status === status
                  ? "bg-button-bg text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              } ${isActionDisabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Progress
          </span>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">{progress}%</span>
            {isCompleted ? (
              <CheckCircle2 size={16} className="text-green-500" />
            ) : (
              !isActionDisabled && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-button-bg hover:text-button-bg/80"
                >
                  {isEditing ? "Cancel" : "Update"}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-button-bg transition-all duration-300 dark:bg-button-bg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {isEditing && !isActionDisabled && (
          <div className="mt-3">
            <input
              type="range"
              min="0"
              max={isAssignedUser ? 80 : 100}
              value={progress}
              onChange={handleProgressChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            />
            <div className="mt-1 flex justify-between">
              <span className="text-xs text-gray-500">0%</span>
              <span className="text-xs text-gray-500">50%</span>
              <span className="text-xs text-gray-500">
                {isAssignedUser ? "80%" : "100%"}
              </span>
            </div>
            <button
              onClick={handleProgressSubmit}
              className="mt-3 w-full rounded-md bg-button-bg px-4 py-2 text-sm text-white transition-colors hover:bg-button-bg/90"
            >
              Save Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskProgress;
