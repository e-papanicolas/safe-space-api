import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.json" assert { type: "json" };
import User from "../models/user.model.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Profile = sequelize.define("Profile", {
  avatar: DataTypes.STRING,
  nickname: DataTypes.STRING,
  pronouns: DataTypes.STRING,
  country: DataTypes.STRING,
  about: DataTypes.STRING,
  interests: DataTypes.STRING,
});
// Profile.belongsTo(User);
await Profile.sync({ alter: true });

export default Profile;
