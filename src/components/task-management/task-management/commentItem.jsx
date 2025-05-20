import { ChevronDown, ChevronUp, Reply, Send, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../../utils/taskUtils.js";

const CommentItem = ({
  comment,
  currentUser,
  createComment,
  taskId,
  onAddComment,
  depth = 0,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);

  // Add null checks for comment and author
  if (!comment || !comment.author) {
    return null;
  }

  const isMine = comment.author.id === currentUser?.id;
  const maxDepth = 5; // Maximum nesting level for visual purposes
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      await createComment({
        taskId,
        comment: replyText,
        parentId: comment.id,
      });
      onAddComment(taskId, replyText);
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  const handleReplyKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit(e);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  // Calculate margin with a maximum limit
  const marginLeft =
    depth > 0 ? `${Math.min(depth * 0, maxDepth * 0)}rem` : "0";

  // For very deep nesting, we'll still show the content but with a visual indicator
  const isDeepNested = depth >= maxDepth;

  return (
    <div className="space-y-2" style={{ marginLeft }}>
      {/* Main Comment */}
      <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
        {!isMine && (
          <div className="mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
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
        )}

        <div
          className={`max-w-sm rounded-md p-3 ${
            isMine
              ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
              : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          } ${isDeepNested ? "border-l-4 border-blue-300 dark:border-blue-700" : ""}`}
        >
          <div className="mb-1 flex items-center">
            <span className="text-xs font-medium">{comment.author.name}</span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="whitespace-pre-line text-sm">{comment.text}</p>

          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Reply size={12} className="mr-1" />
              Reply
            </button>
          </div>
        </div>

        {isMine && (
          <div className="ml-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
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
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="ml-10 mr-4 animate-fade-in">
          <form onSubmit={handleReplySubmit} className="flex items-start gap-2">
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
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
              <div className="flex items-center">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author.name}...`}
                  className="w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  rows="1"
                  onKeyDown={handleReplyKeyDown}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="flex items-center rounded-md bg-button-bg px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-button-bg/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={12} className="mr-1" />
                  Reply
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Nested Replies */}
      {hasReplies && (
        <div className="pl-4 md:pl-6">
          <div className="flex items-center">
            <button
              onClick={toggleReplies}
              className="mb-1 flex items-center text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              {showReplies ? (
                <ChevronUp size={14} className="mr-1" />
              ) : (
                <ChevronDown size={14} className="mr-1" />
              )}
              {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          </div>

          {showReplies && (
            <div className="space-y-4 border-l-2 border-gray-200 pl-4 dark:border-gray-700">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  createComment={createComment}
                  taskId={taskId}
                  onAddComment={onAddComment}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
