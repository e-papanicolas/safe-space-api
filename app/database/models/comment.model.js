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
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
      },
    },
    postId: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
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

export default Comment;
