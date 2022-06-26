import postActions from "../controllers/post.controller.js";
import express from "express";
import { imageUpload, parser } from "../middleware/cloudinary.js";
import auth from "../middleware/auth.js";

const postRoutes = express.Router();

postRoutes.post(
  "/",
  auth,
  parser.single("image"),
  imageUpload,
  postActions.new
);
postRoutes.get("/:id", auth, postActions.getOne);
postRoutes.get("/", auth, postActions.getAll);
postRoutes.put(
  "/:id",
  parser.single("image"),
  imageUpload,
  postActions.updateOne
);
postRoutes.delete("/:id", auth, postActions.destroyOne);

export default postRoutes;
