import express from "express";
import { body } from "express-validator";
import authUser from "../middlewares/user.middleware.js";
import {
  createTask,
  deleteTask,
  filterTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasks.controller.js";

const taskRouter = express.Router();

taskRouter.get("/", authUser, getAllTasks);
taskRouter.get("/:id", authUser, getTaskById);

taskRouter.post(
  "/create",
  authUser,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 200 })
      .withMessage("Title cannot exceed 200 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage("Description cannot exceed 1000 characters"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Invalid priority"),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid date"),
  ],
  createTask
);

taskRouter.put(
  "/update/:id",
  authUser,
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .isLength({ max: 200 })
      .withMessage("Title cannot exceed 200 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage("Description cannot exceed 1000 characters"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Invalid priority"),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid date"),
  ],
  updateTask
);
taskRouter.delete("/delete/:id", authUser, deleteTask);
taskRouter.get("/filter/:status", authUser, filterTask);

export default taskRouter;