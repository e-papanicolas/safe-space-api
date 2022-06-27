import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Post = sequelize.define(
  "Post",
  {
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

Post.associate = (models) => {
  Post.belongsTo(models.users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Post.hasMany(models.comments, {
    foreignKey: "postId",
    onDelete: "CASCADE",
  });
};

export default Post;
