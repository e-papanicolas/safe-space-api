import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Tag = sequelize.define(
  "Tag",
  {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
  },
  {}
);

Tag.serializeMany = (tags) => {
  return tags.map((tag) => {
    return {
      id: tag.id,
      name: tag.name,
      category: tag.category,
    };
  });
};

Tag.associate = (models) => {
  Tag.hasMany(models.profileTags, { foreignKey: "tagId" });
};

export default Tag;
