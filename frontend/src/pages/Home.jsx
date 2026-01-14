import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../slicer/taskSlicer";
import {
  Plus,
  Search,
  Calendar,
  AlertCircle,
  Edit2,
  Trash2,
  Filter,
  MoreVertical,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedTask, setExpandedTask] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || true
  );
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleCreateTask = async (taskData) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      toast.success("Task created successfully! 🎉");
      setShowForm(false);
      dispatch(getAllTasks());
    } catch (error) {
      toast.error(error.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      await dispatch(updateTask({ id: taskId, ...taskData })).unwrap();
      toast.success("Task updated successfully! ✅");
      setEditingTask(null);
      dispatch(getAllTasks());
    } catch (error) {
      toast.error(error.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
        toast.success("Task deleted successfully! 🗑️");
        dispatch(getAllTasks());
      } catch (error) {
        toast.error(error.message || "Failed to delete task");
      }
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await dispatch(updateTask({ id: taskId, status: newStatus })).unwrap();
      toast.success(`Task marked as ${newStatus}! 🎯`);
      dispatch(getAllTasks());
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const filteredTasks = tasks
    ?.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || task.status === selectedStatus;
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return sortOrder === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "dueDate") {
        return sortOrder === "desc"
          ? new Date(b.dueDate || 0) - new Date(a.dueDate || 0)
          : new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      }
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sortOrder === "desc"
          ? priorityOrder[b.priority] - priorityOrder[a.priority]
          : priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const getPriorityStyles = (priority) => {
    const styles = {
      high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
      medium:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      low: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    };
    return (
      styles[priority] ||
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
    );
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      "in-progress":
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      completed:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    };
    return (
      styles[status] ||
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === "completed") return false;
    return new Date(dueDate) < new Date();
  };

  if (loading && !tasks) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin animation-delay-150 mx-auto"></div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium animate-pulse">
            Loading your tasks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-colors duration-200">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#f3f4f6" : "#1f2937",
            border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="lg:hidden btn bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-none text-gray-700 dark:text-gray-300"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-3">
              <TaskFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>

            {/* New Task Button */}
            <button
              onClick={() => setShowForm(true)}
              className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              New Task
            </button>
          </div>
          {showFilterPanel && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <TaskFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>
          )}
        </div>
        {filteredTasks?.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No tasks found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {searchTerm ||
              selectedStatus !== "all" ||
              selectedPriority !== "all"
                ? "Try adjusting your filters or search terms to find what you're looking for"
                : "Get started by creating your first task and boost your productivity!"}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none text-white shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks?.map((task, index) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityStyles(
                          task.priority
                        )}`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(
                          task.status
                        )}`}
                      >
                        {task.status.replace("-", " ").toUpperCase()}
                      </span>
                      {isOverdue(task.dueDate, task.status) && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse">
                          OVERDUE
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {task.title}
                    </h3>
                  </div>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow-xl bg-white dark:bg-gray-800 rounded-xl w-52 border border-gray-200 dark:border-gray-700 z-[1]"
                    >
                      <li>
                        <button
                          onClick={() => setEditingTask(task)}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Task
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Task
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {task.description && (
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {task.description}
                    </p>
                    {task.description.length > 100 && (
                      <button
                        onClick={() =>
                          setExpandedTask(
                            expandedTask === task._id ? null : task._id
                          )
                        }
                        className="text-indigo-600 dark:text-indigo-400 text-sm hover:text-indigo-700 dark:hover:text-indigo-300 mt-2 font-medium"
                      >
                        {expandedTask === task._id ? "Show less" : "Read more"}
                      </button>
                    )}
                    {expandedTask === task._id && (
                      <p className="text-gray-600 dark:text-gray-300 mt-3">
                        {task.description}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span
                      className={`text-sm font-medium ${
                        isOverdue(task.dueDate, task.status)
                          ? "text-red-600 dark:text-red-400"
                          : ""
                      }`}
                    >
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusUpdate(task._id, e.target.value)
                    }
                    className="select select-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={
              editingTask
                ? (data) => handleUpdateTask(editingTask._id, data)
                : handleCreateTask
            }
            onClose={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            isEditing={!!editingTask}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
