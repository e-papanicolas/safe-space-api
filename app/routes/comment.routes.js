import commentActions from "../controllers/user.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();

// create a new comment
commentRoutes.post("/", commentActions.new);
// retrieve all comments for post with id
commentRoutes.get("/:id", commentActions.getOne);
// update a comment with an id
commentRoutes.put("/:id", commentActions.updateOne);
// delete a comment with an id
commentRoutes.delete("/:id", commentActions.destroyOne);

export default commentRoutes;
