import { PlusCircle } from "lucide-react";
import { useState } from "react";
import TaskCard from "./TaskCard";

const TASKS_PER_PAGE = 10;

const TaskList = ({
  tasks,
  onTaskClick,
  onCreateTask,
  currentUserId,
  onDeleteTask,
}) => {
  const [pageState, setPageState] = useState({});

  const getStatusHeader = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "Not Started";
      case "IN_PROGRESS":
        return "In Progress";
      case "REVIEW":
        return "Under Review";
      case "COMPLETED":
        return "Completed";
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

  const tasksByStatus = {
    NOT_STARTED: tasks.filter((task) => task.status === "NOT_STARTED"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    REVIEW: tasks.filter((task) => task.status === "REVIEW"),
    COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
  };

  const getPage = (status, type) => pageState[`${status}-${type}`] || 1;
  const setPage = (status, type, newPage) => {
    setPageState((prev) => ({ ...prev, [`${status}-${type}`]: newPage }));
  };

  const paginate = (items, page) =>
    items.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {Object.entries(tasksByStatus).map(([status, taskList]) => {
        const assignedToMe = taskList.filter(
          (task) => task.assignedToId === currentUserId,
        );
        const assignedByMe = taskList.filter(
          (task) => task.assignedById === currentUserId,
        );

        const toMePage = getPage(status, "toMe");
        const byMePage = getPage(status, "byMe");

        const toMePaginated = paginate(assignedToMe, toMePage);
        const byMePaginated = paginate(assignedByMe, byMePage);

        return (
          <div
            key={status}
            className="rounded-md border border-dark-box border-opacity-5 bg-white p-4 shadow-sm dark:bg-dark-box"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`h-3 w-3 rounded-full ${getStatusColor(status)} mr-2`}
                />
                <h3 className="font-medium text-gray-900 dark:text-dark-text-color">
                  {getStatusHeader(status)} ({taskList.length})
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

            <div className="max-h-[calc(100vh-220px)] space-y-4 overflow-y-auto">
              {/* Assigned To Me */}
              {assignedToMe.length > 0 && (
                <div className="rounded-md p-2">
                  <p className="mb-2 border-b border-dashed border-gray-300 pb-1 text-xs font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-300">
                    Assigned To Me
                  </p>
                  <div className="space-y-2">
                    {toMePaginated.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={onTaskClick}
                        onDeleteTask={onDeleteTask}
                      />
                    ))}
                  </div>
                  {assignedToMe.length > TASKS_PER_PAGE && (
                    <div className="mt-2 flex justify-center gap-2">
                      <button
                        onClick={() => setPage(status, "toMe", toMePage - 1)}
                        disabled={toMePage === 1}
                        className="rounded bg-gray-100 px-2 py-1 text-xs disabled:opacity-50 dark:bg-gray-700"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setPage(status, "toMe", toMePage + 1)}
                        disabled={
                          toMePage >=
                          Math.ceil(assignedToMe.length / TASKS_PER_PAGE)
                        }
                        className="rounded bg-gray-100 px-2 py-1 text-xs disabled:opacity-50 dark:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Assigned By Me */}
              {assignedByMe.length > 0 && (
                <div className="rounded-md p-2">
                  <p className="mb-2 border-b border-dashed border-gray-300 pb-1 text-xs font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-300">
                    Assigned By Me
                  </p>
                  <div className="space-y-2">
                    {byMePaginated.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={onTaskClick}
                        onDeleteTask={onDeleteTask}
                      />
                    ))}
                  </div>
                  {assignedByMe.length > TASKS_PER_PAGE && (
                    <div className="mt-2 flex justify-center gap-2">
                      <button
                        onClick={() => setPage(status, "byMe", byMePage - 1)}
                        disabled={byMePage === 1}
                        className="rounded bg-gray-100 px-2 py-1 text-xs disabled:opacity-50 dark:bg-gray-700"
                      >
                        Prev
                      </button>

                      <button
                        onClick={() => setPage(status, "byMe", byMePage + 1)}
                        disabled={
                          byMePage >=
                          Math.ceil(assignedByMe.length / TASKS_PER_PAGE)
                        }
                        className="rounded bg-gray-100 px-2 py-1 text-xs disabled:opacity-50 dark:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {assignedToMe.length === 0 && assignedByMe.length === 0 && (
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
        );
      })}
    </div>
  );
};

export default TaskList;
