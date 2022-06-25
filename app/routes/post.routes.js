import postActions from "../controllers/post.controller.js";
import express from "express";
import { imageUpload, parser } from "../middleware/cloudinary.js";
import auth from "../middleware/auth.js";

const postRoutes = express.Router();

postRoutes.post("/", parser.single("image"), imageUpload, postActions.new);
postRoutes.get("/:id", postActions.getOne);
postRoutes.get("/", postActions.getAll);
postRoutes.put("/:id", postActions.updateOne);
postRoutes.delete("/:id", postActions.destroyOne);

export default postRoutes;
