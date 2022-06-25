import commentActions from "../controllers/comment.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();

commentRoutes.post("/", commentActions.new);
commentRoutes.get("/:id", commentActions.getOne);
commentRoutes.delete("/:id", commentActions.destroyOne);

export default commentRoutes;
