import { db } from "../database/models/index.js";

const Comment = db.comments;
const commentActions = {};

commentActions.new = async (req, res, next) => {};
commentActions.getOne = async (req, res, next) => {};
commentActions.updateOne = async (req, res, next) => {};
commentActions.destroyOne = async (req, res, next) => {};

export default commentActions;
