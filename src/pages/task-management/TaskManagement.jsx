import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

// Import components
import TaskDetail from "../../components/task-management/task-management/TaskDetail";
import TaskFilter from "../../components/task-management/task-management/TaskFilter";
import TaskForm from "../../components/task-management/task-management/TaskForm";
import TaskList from "../../components/task-management/task-management/TaskList";
import {
  useCreateTaskMutation,
  useGetEmployeesQuery,
  useGetMyTasksQuery,
  useGetUserQuery,
} from "../../features/api";
import {
  currentUser,
  priorityOptions,
  statusOptions,
  users,
} from "../../helpers/mockData";

// Import mock data
// import {
//   currentUser,
//   tasks as mockTasks,
//   priorityOptions,
//   statusOptions,
//   users,
// } from "../../helpers/mockData";

// Generate a new unique ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

function TaskManagement() {
  const [createTask] = useCreateTaskMutation();

  const { data: user } = useGetUserQuery();

  const companyId = user?.data?.company_id;

  const { data: employeeList } = useGetEmployeesQuery(companyId);

  const employees = employeeList?.data;

  const { data, isLoading } = useGetMyTasksQuery();

  // State
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  useEffect(() => {
    setTasks(data?.data || []);
  }, []);

  console.log(tasks);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Handler for clicking on a task
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  // Handler for going back to task list
  const handleBackClick = () => {
    setSelectedTask(null);
  };

  // Handler for opening task creation form
  const handleCreateTask = () => {
    setIsFormOpen(true);
    setIsEditing(false);
  };

  // Handler for opening task editing form
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
    setIsEditing(true);
  };

  // Handler for closing form
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Initial values for new task
  const initialTaskValues = {
    title: "",
    description: "",
    status: "NOT_STARTED",
    priority: "",
    progress: 0,
    assignedToId: "",
    dueDate: new Date().toISOString().split("T")[0],
    tags: [],
  };

  // Handler for form submission
  const handleFormSubmit = async (values) => {
    console.log(values);
    if (isEditing) {
      // Update existing task
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id
          ? { ...task, ...values, updatedAt: new Date() }
          : task,
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...selectedTask, ...values, updatedAt: new Date() });
    } else {
      // Create new task
      // const newTask = {
      //   ...values,
      //   progress: 0,
      //   status: "not_started",
      //   comments: [],
      //   activities: [
      //     {
      //       id: generateId(),
      //       description: "Task created",
      //       user: currentUser,
      //       timestamp: new Date(),
      //       type: "created",
      //     },
      //   ],
      // };

      await createTask(values);
      setTasks([...tasks, newTask]);
    }
    setIsFormOpen(false);
  };

  // Handler for updating task status
  const handleStatusUpdate = (taskId, status) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Auto-update progress based on status
        let progress = task.progress;
        if (status === "COMPLETED") progress = 100;
        else if (status === "NOT_STARTED") progress = 0;
        else if (status === "IN_PROGRESS" && task.progress === 0) progress = 10;

        // Add activity record
        const newActivity = {
          id: generateId(),
          description: `Changed status from ${task.status} to ${status}`,
          user: currentUser,
          timestamp: new Date(),
          type: "status_change",
        };

        return {
          ...task,
          status,
          progress,
          updatedAt: new Date(),
          activities: [newActivity, ...task.activities],
        };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      setSelectedTask(updatedTask);
    }
  };

  // Handler for updating task progress
  const handleProgressUpdate = (taskId, progress) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Auto-update status based on progress
        let status = task.status;
        if (progress === 100) status = "COMPLETED";
        else if (progress > 0 && task.status === "NOT_STARTED")
          status = "IN_PROGRESS";

        // Add activity record
        const newActivity = {
          id: generateId(),
          description: `Updated progress from ${task.progress}% to ${progress}%`,
          user: currentUser,
          timestamp: new Date(),
          type: "progress_update",
        };

        return {
          ...task,
          progress,
          status,
          updatedAt: new Date(),
          activities: [newActivity, ...task.activities],
        };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      setSelectedTask(updatedTask);
    }
  };

  // Handler for adding a comment
  const handleAddComment = (taskId, text) => {
    const newComment = {
      id: generateId(),
      text,
      author: currentUser,
      createdAt: new Date(),
    };

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Add activity record
        const newActivity = {
          id: generateId(),
          description: "Added a comment",
          user: currentUser,
          timestamp: new Date(),
          type: "comment",
        };

        return {
          ...task,
          comments: [newComment, ...task.comments],
          activities: [newActivity, ...task.activities],
          updatedAt: new Date(),
        };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      setSelectedTask(updatedTask);
    }
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus
      ? task.status === selectedStatus
      : true;
    const matchesPriority = selectedPriority
      ? task.priority === selectedPriority
      : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedStatus("");
    setSelectedPriority("");
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${isDarkMode ? "dark" : ""}`}
    >
      <main className="container mx-auto px-4 py-6">
        {!selectedTask ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-color">
                Tasks
              </h2>
              <button
                onClick={handleCreateTask}
                className="flex items-center rounded-md bg-button-bg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-button-bg/90"
              >
                <Plus size={18} className="mr-1" />
                Create Task
              </button>
            </div>

            <TaskFilter
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
              selectedStatus={selectedStatus}
              selectedPriority={selectedPriority}
              searchQuery={searchQuery}
              onStatusChange={setSelectedStatus}
              onPriorityChange={setSelectedPriority}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />

            <TaskList
              tasks={filteredTasks}
              onTaskClick={handleTaskClick}
              onCreateTask={handleCreateTask}
            />
          </div>
        ) : (
          <TaskDetail
            task={selectedTask}
            currentUser={currentUser}
            onBack={handleBackClick}
            onStatusUpdate={handleStatusUpdate}
            onProgressUpdate={handleProgressUpdate}
            onAddComment={handleAddComment}
            onEdit={handleEditTask}
          />
        )}
      </main>

      {isFormOpen && (
        <TaskForm
          initialValues={isEditing ? selectedTask : initialTaskValues}
          users={users}
          employees={employees}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default TaskManagement;
