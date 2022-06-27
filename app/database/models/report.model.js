import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Report = sequelize.define(
  "Report",
  {
    name: {
      type: DataTypes.STRING,
    },
    pronouns: {
      type: DataTypes.STRING,
    },
    anonymous: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recieved: {
      type: DataTypes.BOOLEAN,
    },
  },
  {}
);

export default Report;
