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
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        // allowNull: false,
      },
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
