import { db } from "../database/models/index.js";

const Post = db.posts;
const postActions = {};

postActions.new = async (req, res, next) => {};
postActions.getOne = async (req, res, next) => {};
postActions.updateOne = async (req, res, next) => {};
postActions.destroyOne = async (req, res, next) => {};

export default postActions;
