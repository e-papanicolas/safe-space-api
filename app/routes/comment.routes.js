import commentActions from "../controllers/comment.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();

// create a new comment, returns the comment
commentRoutes.post("/", commentActions.new);
// retrieve all comments for post with postId
commentRoutes.get("/:id", commentActions.getOne);
// delete a comment with an id
commentRoutes.delete("/:id", commentActions.destroyOne);

export default commentRoutes;
