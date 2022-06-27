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
  
/**
 * @function
 * This function takes in a user object and returns non sensitive data.
 * When other fields are associated with the user, add them in here.
 */
User.serialize = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    Profile: user.Profile,
    Posts: user.Posts,
  };
};

User.serializeMany = (users) => {
  return users.map((user) => {
    return User.serialize(user);
  });
};

User.associate = (models) => {
  User.hasOne(models.profiles, { foreignKey: "userId" });
  User.hasMany(models.posts, { foreignKey: "userId" });
  User.hasMany(models.comments, { foreignKey: "userId" });
  User.belongsToMany(models.tags, { through: "UserTags" });
};

//  ! this has the has many through
// User.associate = (models) => {
//   User.hasOne(models.profiles, { foreignKey: "userId" });
//   User.hasMany(models.posts, { foreignKey: "userId" });
//   User.hasMany(models.comments, { foreignKey: "userId", through: "Posts" });
// };

export default User;
