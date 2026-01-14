import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is not present" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = payload;
    if (!userId)
      return res.status(404).json({ success: false, message: "Invalid token" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User does'n exist" });
    req.user = user;
    next();
  } catch (error) {
    console.error("authUser error:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
