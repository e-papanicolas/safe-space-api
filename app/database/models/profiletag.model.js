import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const ProfileTag = sequelize.define(
  "ProfileTag",
  {
    profileId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
  },
  {}
);

ProfileTag.serializeMany = (tags) => {
  return tags.map((tag) => {
    return {
      id: tag.id,
    };
  });
};

ProfileTag.associate = (models) => {
  ProfileTag.belongsTo(models.profiles, {
    foreignKey: "profileId",
    onDelete: "CASCADE",
  });
  ProfileTag.belongsTo(models.tags, {
    foreignKey: "tagId",
    onDelete: "CASCADE",
  });
};

export default ProfileTag;
