// GET /user/all
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json({
//       success: true,
//       users,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching users",
//       error: error.message,
//     });
//   }
// };

// GET /user/:id
// export const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     res.json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user",
//       error: error.message,
//     });
//   }
// };

// // POST /user
// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const newUser = await User.create({
//       name,
//       email,
//       password,
//     });
//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating user",
//       error: error.message,
//     });
//   }
// };

// // DELETE /user/:userId
// export const deleteUser = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const deletedUser = await User.findByIdAndRemove(userId);
//     if (!deletedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//       user: deletedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error deleting user",
//       error: error.message,
//     });
//   }
// };

// // PUT /user/:userId
// export const updateUser = async (req, res) => {
//   const userId = req.params.userId;
//   const { name, email, password } = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         name,
//         email,
//         password,
//       },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error updating user",
//       error: error.message,
//     });
//   }
// };
// controllers/userController.js
// import User from "../models/user.js";







// controllers/userController.js
import User from "../models/user.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendCookie } from "../utils/features.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the provided email exists in the database
  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email and Password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email and Password",
    });
  }

  SendCookie(user, res, `Welcome back, ${user.name}`,200);
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  SendCookie(user, res, "Registered Succesfully", 201);
};

export const getMyProfile = (req, res) => {

  res.status(200).json({
    success:true,
    user:req.user,
  });
};

export const logout = (req, res) => {
  res.status(200).cookie("token", "", {expires:new Date(Date.now())}).json({
    success:true,
    Messsage:"Logout Successful",
    user:req.user,
  });
}


export const getAllUsers = async (req, res) => {};

