import { Sequelize } from "sequelize";
import Users from "./user.model.js";
import config from "../config/config.json" assert { type: "json" };

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = Users(sequelize);

// test the connection to the database
try {
  await sequelize.authenticate();
  console.log("sequelize connection successful");
} catch (err) {
  console.error("unable to connect to database");
}

export { db };
