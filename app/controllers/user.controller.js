import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateRefreshToken,
  generateAccessToken,
  addTokenToList,
  refreshList,
} from "../helpers/tokens.js";
import { db } from "../database/models/index.js";

const User = db.users;
const userActions = {};

userActions.new = async (req, res, next) => {
  // validate request
  if (!req.body.username) {
    res.status(400).json({ message: "Fields cannot be empty" });
  }
  // create instance and save to db
  try {
    let newUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (newUser) return res.status(400).json({ message: "username is taken" });
    // password encryption
    const salt = await bcrypt.genSalt(10);
    const pswd = await bcrypt.hash(req.body.password, salt);
    // create the instance with the hashed password
    newUser = User.build({
      username: req.body.username,
      email: req.body.email,
      password: pswd,
    });
    await newUser.save();

    // payload for signing the JWT token
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    // generates the tokens and adds to the list for refresh
    const token = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    addTokenToList(refreshToken, token);

    res.status(200).json({ token, refreshToken, newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userActions.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({
      where: { username: username },
    });
    if (!user) return res.status(404).json({ message: "invalid username" });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(404).json({ message: "invalid password" });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    addTokenToList(refreshToken, token);
    res.status(200).json({ user, token, refreshToken });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

userActions.tokenRefresh = async (req, res, next) => {
  const data = req.body;
  if (data.refreshToken && data.refreshToken in refreshList) {
    const decoded = jwt.verify(data.refreshToken, process.env.JWT_R_KEY);
    console.log(decoded);
    const token = generateAccessToken(decoded.user);
    const refreshToken = generateRefreshToken(decoded.user);
    addTokenToList(refreshToken, token);
    res.status(200).json({ user: decoded.user, token, refreshToken });
  } else {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

userActions.getAll = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userActions.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userActions.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    let updatedUser = await User.findByPk(id);
    await updatedUser.update(req.body);
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userActions.destroyOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userToDelete = await User.findByPk(id);
    await userToDelete.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default userActions;
