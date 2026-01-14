import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/user", userRouter);
app.use("/tasks", taskRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use((req, res, next) => {
  if (
    req.path.startsWith("/user") || 
    req.path.startsWith("/tasks") ||
    req.path.includes(".")
  ) {
    return next();
  }
  
  return res.sendFile(
    path.resolve(__dirname, "frontend", "dist", "index.html")
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

export default app;