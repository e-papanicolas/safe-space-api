import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

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
  },
  {}
);

User.associate = (models) => {
  User.hasOne(models.profiles, { foreignKey: "userId" });
  User.hasMany(models.posts, { foreignKey: "userId" });
  User.hasMany(models.comments, { foreignKey: "userId" });
};

//  ! this has the has many through
// User.associate = (models) => {
//   User.hasOne(models.profiles, { foreignKey: "userId" });
//   User.hasMany(models.posts, { foreignKey: "userId" });
//   User.hasMany(models.comments, { foreignKey: "userId", through: "Posts" });
// };

export default User;
