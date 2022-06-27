"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProfileTags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      profileId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Profiles",
          key: "id",
          as: "profileId",
        },
      },
      tagId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Tags",
          key: "id",
          as: "tagId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProfileTags");
  },
};
