import avatarUpload from "../middleware/cloudinary.js";
import express from "express";
import auth from "../middleware/auth.js";
import profileActions from "../controllers/profile.controller.js";

const profileRoutes = express.Router();

// update profile
profileRoutes.put("/:id", profileActions.updateProfile);
profileRoutes.post("/:id", profileActions.new);

export default profileRoutes;
