import { avatarUpload, parser } from "../middleware/cloudinary.js";
import express from "express";
import auth from "../middleware/auth.js";
import profileActions from "../controllers/profile.controller.js";

const profileRoutes = express.Router();

profileRoutes.put(
  "/:userId",
  auth,
  parser.single("avatar"),
  avatarUpload,
  profileActions.updateProfile
);

profileRoutes.get("/tags", auth, profileActions.getTags);

profileRoutes.post("/add_tags", auth, profileActions.addTags);

export default profileRoutes;
