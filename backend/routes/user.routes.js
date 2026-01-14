import express from "express";
import {
  postLogin,
  postLogout,
  postSignup,
  validUser,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", postSignup);
userRouter.post("/login", postLogin);
userRouter.post("/logout", postLogout);
userRouter.get("/check", authUser, validUser);

export default userRouter;
