import postActions from "../controllers/user.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const postRoutes = express.Router();

// create a new post
postRoutes.post("/", postActions.new);
// retrieve all posts for user with id
postRoutes.get("/:id", postActions.getOne);
// update a post with an id
postRoutes.put("/:id", postActions.updateOne);
// delete a post with an id
postRoutes.delete("/:id", postActions.destroyOne);

export default postRoutes;
