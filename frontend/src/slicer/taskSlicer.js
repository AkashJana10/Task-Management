import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// Get all tasks
export const getAllTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/tasks/");
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch tasks"
      );
    }
  }
);

// Get task by ID
export const getTaskById = createAsyncThunk(
  "tasks/getById",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/tasks/${taskId}`);
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch task"
      );
    }
  }
);

// Create new task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/tasks/create", taskData);
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create task"
      );
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, ...taskData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/tasks/update/${id}`, taskData);
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update task"
      );
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/tasks/delete/${taskId}`);
      return { id: taskId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete task"
      );
    }
  }
);

// Filter tasks by status
export const filterTask = createAsyncThunk(
  "tasks/filter",
  async (status, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/tasks/filter/${status}`);
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to filter tasks"
      );
    }
  }
);

// Get tasks with query params (status, priority, sort)
export const getTasksWithQuery = createAsyncThunk(
  "tasks/getWithQuery",
  async (queryParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/tasks/", {
        params: queryParams,
      });
      console.log(response.data);
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch tasks"
      );
    }
  }
);

// Update task status
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}`, { status });
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update task status"
      );
    }
  }
);

// Update task priority
export const updateTaskPriority = createAsyncThunk(
  "tasks/updatePriority",
  async ({ id, priority }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}`, { priority });
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update task priority"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    filters: {
      status: "all",
      priority: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        status: "all",
        priority: "all",
        sortBy: "createdAt",
        sortOrder: "desc",
      };
    },
    // Local task update for optimistic updates
    updateTaskLocally: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    // Local task deletion for optimistic updates
    deleteTaskLocally: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all tasks
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get task by ID
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
        state.error = null;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload); // Add new task at beginning
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?._id === action.payload._id) {
          state.currentTask = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.id
        );
        if (state.currentTask?._id === action.payload.id) {
          state.currentTask = null;
        }
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Filter tasks
      .addCase(filterTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(filterTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get tasks with query
      .addCase(getTasksWithQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksWithQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(getTasksWithQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update task status
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index].status = action.payload.status;
        }
        if (state.currentTask?._id === action.payload._id) {
          state.currentTask.status = action.payload.status;
        }
        state.error = null;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update task priority
      .addCase(updateTaskPriority.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskPriority.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index].priority = action.payload.priority;
        }
        if (state.currentTask?._id === action.payload._id) {
          state.currentTask.priority = action.payload.priority;
        }
        state.error = null;
      })
      .addCase(updateTaskPriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentTask,
  setFilters,
  resetFilters,
  updateTaskLocally,
  deleteTaskLocally,
} = taskSlice.actions;

export default taskSlice.reducer;
