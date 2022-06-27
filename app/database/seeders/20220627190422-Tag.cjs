"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tags",
      [
        {
          name: "activism",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "entrepeneurship",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "healthcare",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "politics",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "religion",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "arts",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "tech",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "social media",
          category: "interests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "sub-saharan africa",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "east africa",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "west africa",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "central africa",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "north africa",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "southern europe",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "eastern europe",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "united states",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "canada",
          category: "location",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "lesbian",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "gay",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bisexual",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "transgender",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "queer",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "intersex",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "non-binary",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "asexual",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "gender fluid",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "gender nonconforming",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "single caregiver",
          category: "identity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
