"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },

      comment_id: {
        type: Sequelize.INTEGER,
        references: { model: "comments", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("likes");
  },
};
