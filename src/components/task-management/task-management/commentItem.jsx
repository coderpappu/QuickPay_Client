import { ChevronDown, ChevronUp, Reply, Send, X } from "lucide-react";
import { useState } from "react";

// Helper function for formatting dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHrs < 24) {
    return `${diffHrs}h`;
  } else {
    return date.toLocaleDateString();
  }
};

const CommentItem = ({
  comment,
  currentUser,
  createComment,
  taskId,
  onAddComment,
  depth = 0,
  parentAuthor = null,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  if (!comment) return null;

  const author = comment.author || {
    id: comment.authorId || "unknown",
    name: "Unknown User",
  };

  const isMine = author.id === currentUser?.id;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      try {
        const newComment = await createComment({
          taskId,
          comment: replyText,
          parentId: comment.id,
        });
        onAddComment(taskId, replyText, newComment);
        setReplyText("");
        setShowReplyForm(false);
      } catch (error) {
        console.error("Error posting reply:", error);
      }
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

  return (
    <div className="relative space-y-2">
      {parentAuthor && (
        <div className="bo absolute -left-4 top-4 h-6 w-4 rounded-bl-lg dark:border-gray-600" />
      )}

      {/* Main Comment */}
      <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
        {!isMine && (
          <div className="mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-700">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            ) : (
              author.name.charAt(0).toUpperCase()
            )}
          </div>
        )}

        <div
          className={`max-w-sm rounded-md p-3 ${
            isMine
              ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
              : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          <div className="mb-1 flex flex-wrap items-center">
            <span className="text-xs font-medium">{author.name}</span>
            {parentAuthor && (
              <span className="mx-2 text-xs text-gray-500 dark:text-gray-400">
                replying to {parentAuthor}
              </span>
            )}
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
                  placeholder={`Reply to ${author.name}...`}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
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
                  className="flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="mt-2">
          <div className="flex items-center">
            <button
              onClick={toggleReplies}
              className="mb-1 ml-5 flex items-center text-xs text-blue-600 hover:underline dark:text-blue-400"
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
            <div className="space-y-4">
              {/* First reply */}
              <div className="relative ml-1">
                <CommentItem
                  key={comment.replies[0].id}
                  comment={comment.replies[0]}
                  currentUser={currentUser}
                  createComment={createComment}
                  taskId={taskId}
                  onAddComment={onAddComment}
                  depth={0}
                  parentAuthor={author.name}
                />
              </div>

              {/* Subsequent replies */}
              <div className="space-y-4 pl-4 dark:border-gray-600">
                {comment.replies.slice(1).map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    currentUser={currentUser}
                    createComment={createComment}
                    taskId={taskId}
                    onAddComment={onAddComment}
                    depth={0}
                    parentAuthor={author.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
