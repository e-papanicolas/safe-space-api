import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Profile = sequelize.define(
  "Profile",
  {
    avatar: DataTypes.STRING,
    nickname: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    countryofOrigin: DataTypes.STRING,
    currentLocation: DataTypes.STRING,
    about: DataTypes.STRING,
    interests: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {}
);

Profile.associate = (models) => {
  Profile.belongsTo(models.users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Profile.hasMany(models.profileTags, { foreignKey: "profileId" });
};

export default Profile;
