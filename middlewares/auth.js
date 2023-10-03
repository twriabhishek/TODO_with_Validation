import User from "../models/user.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req, res, next) => {

  const { token } = req.cookies;
  
//   console.log(token);
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  const decoded = jwt.verify(token, "rfghjhvcxdsrtyhj");

  const _id = decoded._id;
  req.user = await User.findById(_id);
  next();
};
