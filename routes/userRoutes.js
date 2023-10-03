// routes/userRoutes.js
import express from "express";
import {
  register,
  login,
  getMyProfile,
  logout,
  getAllUsers

} from "../controllers/userController.js";

import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);
router.get("/all", getAllUsers);


// router.post("/new", register);
// router.post("/login", login);
// router.get("/me", isAuthenticated, getMyProfile);
// router.get("/logout", logout);
// router.get("/all", getAllUsers);




export default router;