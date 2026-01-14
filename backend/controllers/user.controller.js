import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format!",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Weak password!",
      });
    }
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "username must be greaterthen 3 ",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password is required !");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password !");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password !");
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(201).json({
      success: true,
      message: "user Login successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const postLogout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const paylord = jwt.decode(token);
    res.cookie("token", null, new Date(Date.now()));
    return res
      .status(201)
      .json({ success: true, message: "User logout successful" });
  } catch (error) {
    console.log("Error in logout", error);
    return res.status(503).json({ success: false, message: error.message });
  }
};

export const validUser = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };
    return res.status(201).json({ success: true, message: "valid user", user });
  } catch (error) {
    console.log("Error valid user", error);
    return res.status(503).json({ success: false, message: error });
  }
};
