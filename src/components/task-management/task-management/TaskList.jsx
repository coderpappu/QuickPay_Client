import { PlusCircle } from "lucide-react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onTaskClick, onCreateTask }) => {
  // Group tasks by status
  const tasksByStatus = {
    NOT_STARTED: tasks.filter((task) => task.status === "NOT_STARTED"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    REVIEW: tasks.filter((task) => task.status === "REVIEW"),
    COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
  };

  const getStatusHeader = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "Not Started";
      case "IN_PROGRESS":
        return "In Progress";
      case "REVIEW":
        return "Under Review";
      case "COMPLETED":
        return "completed";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "bg-slate-200 dark:bg-slate-700";
      case "IN_PROGRESS":
        return "bg-blue-100 dark:bg-blue-900";
      case "REVIEW":
        return "bg-amber-100 dark:bg-amber-900";
      case "COMPLETED":
        return "bg-green-100 dark:bg-green-900";
      default:
        return "bg-slate-200 dark:bg-slate-700";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {["NOT_STARTED", "IN_PROGRESS", "REVIEW", "COMPLETED"].map((status) => (
        <div
          key={status}
          className="rounded-md border border-dark-box border-opacity-5 bg-white p-4 shadow-sm dark:bg-dark-box"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`h-3 w-3 rounded-full ${getStatusColor(status)} mr-2`}
              ></div>
              <h3 className="font-medium text-gray-900 dark:text-dark-text-color">
                {getStatusHeader(status)} ({tasksByStatus[status].length})
              </h3>
            </div>

            {status === "NOT_STARTED" && (
              <button
                onClick={onCreateTask}
                className="p-1 text-button-bg transition-colors hover:text-button-bg/80"
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>

          <div className="max-h-[calc(100vh-220px)] space-y-2 overflow-y-auto">
            {tasksByStatus[status].length > 0 ? (
              tasksByStatus[status].map((task) => (
                <TaskCard key={task.id} task={task} onClick={onTaskClick} />
              ))
            ) : (
              <div className="rounded-md border border-dashed border-gray-200 p-4 text-center dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {status === "NOT_STARTED"
                    ? "Click + to add a new task"
                    : "No tasks here yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
