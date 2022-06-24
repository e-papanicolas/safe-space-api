import avatarUpload from "../middleware/cloudinary.js";
import express from "express";
import auth from "../middleware/auth.js";
import profileActions from "../controllers/profile.controller.js";

const profileRoutes = express.Router();

// update profile
profileRoutes.put("/:id", avatarUpload, profileActions.updateProfile);

export default profileRoutes;
