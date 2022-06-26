import commentActions from "../controllers/comment.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();

commentRoutes.post("/", auth, commentActions.new);
commentRoutes.get("/:id", auth, commentActions.getOne);
commentRoutes.delete("/:id", auth, commentActions.destroyOne);

export default commentRoutes;
