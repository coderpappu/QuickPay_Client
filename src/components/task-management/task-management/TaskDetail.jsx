import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Send,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import {
  formatDate,
  getDueStatusColor,
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
  getStatusLabel,
} from "../../../utils/taskUtils.js";
import TaskProgress from "./TaskProgress";

const TaskDetail = ({
  task,
  currentUser,
  onBack,
  onStatusUpdate,
  onProgressUpdate,
  onAddComment,
  onEdit,
}) => {
  const [comment, setComment] = useState("");

  const handleStatusUpdate = (status) => {
    onStatusUpdate(task.id, status);
  };

  const handleProgressUpdate = (progress) => {
    onProgressUpdate(task.id, progress);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(task.id, comment);
      setComment("");
    }
  };

  return (
    <div className="rounded-md border border-dark-box border-opacity-5 bg-white shadow-sm dark:bg-dark-box">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="flex-1 text-xl font-medium text-gray-900 dark:text-dark-text-color">
            {task.title}
          </h2>
          <button
            onClick={() => onEdit(task)}
            className="ml-3 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-dark-text-color">
              Details
            </h3>
            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(task.status)}`}
              >
                {getStatusLabel(task.status)}
              </span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}
              >
                {getPriorityLabel(task.priority)}
              </span>
              {task.tags &&
                task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="mb-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {task.description}
              </p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <UserCircle size={16} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Assigned to
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {task.assignedTo.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <UserCircle size={16} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Assigned by
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {task.assignedBy.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Due date
                  </p>
                  <p
                    className={`text-sm font-medium ${getDueStatusColor(task.dueDate)}`}
                  >
                    {formatDate(task.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Created on
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatDate(task.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-dark-text-color">
                Comments
              </h3>

              <div className="mb-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <form
                  onSubmit={handleAddComment}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      currentUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                      rows="2"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="flex items-center rounded-md bg-button-bg px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-button-bg/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send size={14} className="mr-1" />
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {task.comments && task.comments.length > 0 ? (
                <div className="space-y-4">
                  {task.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-md bg-gray-50 p-4 dark:bg-gray-800"
                    >
                      <div className="mb-2 flex items-center">
                        <div className="mr-2 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
                          {comment.author.avatar ? (
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            comment.author.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-dark-text-color">
                            {comment.author.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md bg-gray-50 p-6 text-center dark:bg-gray-800">
                  <MessageSquare
                    size={24}
                    className="mx-auto mb-2 text-gray-400"
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    No comments yet
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-dark-text-color">
                Activity
              </h3>

              {task.activities && task.activities.length > 0 ? (
                <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                  <ul className="space-y-3">
                    {task.activities.map((activity) => (
                      <li key={activity.id} className="flex items-start">
                        <div className="mr-2 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
                          {activity.user.avatar ? (
                            <img
                              src={activity.user.avatar}
                              alt={activity.user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            activity.user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 dark:text-dark-text-color">
                              {activity.user.name}
                            </span>
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(activity.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {activity.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-md bg-gray-50 p-6 text-center dark:bg-gray-800">
                  <Clock size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No activity recorded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <TaskProgress
            task={task}
            onProgressUpdate={handleProgressUpdate}
            onStatusUpdate={handleStatusUpdate}
          />

          <div className="rounded-md border border-dark-box border-opacity-5 bg-white p-4 shadow-sm dark:bg-dark-box">
            <h3 className="mb-3 font-medium text-gray-900 dark:text-dark-text-color">
              Task Information
            </h3>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Created
                </h4>
                <p className="text-sm text-gray-900 dark:text-dark-text-color">
                  {formatDate(task.createdAt)}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </h4>
                <p className="text-sm text-gray-900 dark:text-dark-text-color">
                  {formatDate(task.updatedAt)}
                </p>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tags
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
