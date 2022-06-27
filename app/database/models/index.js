import { Sequelize } from "sequelize";
import config from "../config/config.js";
import User from "./user.model.js";
import Profile from "./profile.model.js";
import Post from "./post.model.js";
import Comment from "./comment.model.js";
import Report from "./report.model.js";
import Tag from "./tag.model.js";
import ProfileTag from "./profiletag.model.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = User;
db.profiles = Profile;
db.posts = Post;
db.comments = Comment;
db.reports = Report;
db.tags = Tag;
db.profileTags = ProfileTag;

// test the connection to the database
try {
  await sequelize.authenticate();
  console.log("sequelize connection successful");
} catch (err) {
  console.error("unable to connect to database");
}

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { db };
