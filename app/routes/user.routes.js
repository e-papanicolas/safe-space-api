import userActions from "../controllers/user.controller.js";
import express from "express";

const userRoutes = express.Router();

// create a new user
userRoutes.post("/", userActions.new);
// login an existing user
userRoutes.post("/login", userActions.login);
// refresh tokens
userRoutes.post("/refresh", userActions.tokenRefresh);
// retrieve all Users
userRoutes.get("/", userActions.getAll);
// retrieve a single user with id
userRoutes.get("/:id", userActions.getOne);
// update a user with an id
userRoutes.put("/:id", userActions.updateOne);
// delete a user with an id
userRoutes.delete("/:id", userActions.destroyOne);

// userRoutes.delete("/", userActions.destroyAll);

export default userRoutes;
