import userActions from "../controllers/user.controller.js";
import express from "express";
import auth from "../middleware/auth.js";
import initialAccess from "../middleware/initialAccess.js";

const userRoutes = express.Router();

// create a new user
userRoutes.post("/", initialAccess, userActions.new);
// login an existing user
userRoutes.post("/login", userActions.login);
// refresh tokens
userRoutes.post("/refresh", auth, userActions.tokenRefresh);
// retrieve all Users
userRoutes.get("/", auth, userActions.getAll);
// retrieve a single user with id
userRoutes.get("/:id", auth, userActions.getOne);
// update a user with an id
userRoutes.put("/:id", auth, userActions.updateOne);
// delete a user with an id
userRoutes.delete("/:id", auth, userActions.destroyOne);

export default userRoutes;
