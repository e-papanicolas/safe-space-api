"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      avatar: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      pronouns: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      interests: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // profileId: {
      //   type: Sequelize.INTEGER,
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Profiles");
  },
};
