import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";
import Profile from "./profile.model.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [3 - 18],
      },
    },
    // my_profile: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return Profile.findOne({ where: { userId: this.id } });
    //   },
    // },
  },
  {}
);

User.associate = (models) => {
  User.hasOne(models.profiles, { foreignKey: "userId" });
};

export default User;
