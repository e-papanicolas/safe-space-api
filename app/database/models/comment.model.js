import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        // allowNull: false,
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      validate: {
        // allowNull: false,
      },
    },
  },
  {}
);

Comment.associate = (models) => {
  Comment.belongsTo(models.users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Comment.belongsTo(models.comments, {
    foreignKey: "postId",
    onDelete: "CASCADE",
  });
};

// ! this has the has many through
// Comment.associate = (models) => {
//   Comment.belongsTo(models.users, {
//     foreignKey: "userId",
//     onDelete: "CASCADE",
//     through: "Posts",
//   });
//   Comment.belongsTo(models.comments, {
//     foreignKey: "postId",
//     onDelete: "CASCADE",
//   });
// };

export default Comment;
