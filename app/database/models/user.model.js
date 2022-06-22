import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.json" assert { type: "json" };

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const User = sequelize.define("User", {
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
});

export default User;
