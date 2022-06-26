import { avatarUpload, parser } from "../middleware/cloudinary.js";
import express from "express";
import auth from "../middleware/auth.js";
import profileActions from "../controllers/profile.controller.js";

const profileRoutes = express.Router();

profileRoutes.put(
  "/:id",
  auth,
  parser.single("avatar"),
  avatarUpload,
  profileActions.updateProfile
);

export default profileRoutes;
