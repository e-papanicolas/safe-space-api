import postActions from "../controllers/post.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const postRoutes = express.Router();

// create a new post, returns just the post
postRoutes.post("/", postActions.new);
// {params: user id} retrieve all posts for user with id, with comments
postRoutes.get("/:id", postActions.getOne);
// get all posts for feed, with comments
postRoutes.get("/", postActions.getAll);
// {params: post id} update a post with an id, returns just the post
postRoutes.put("/:id", postActions.updateOne);
// delete a post with an id
postRoutes.delete("/:id", postActions.destroyOne);

export default postRoutes;
