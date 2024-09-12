import express from "express";
import {
  signup,
  login,
  getMe,
  logout,
} from "../controllers/auth.controller.js ";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/me", protectRoute, getMe);
router.post("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
