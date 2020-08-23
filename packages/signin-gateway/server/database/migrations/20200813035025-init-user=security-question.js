"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, TEXT } = Sequelize;

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.createTable("user_security_questions", {
      id: Sequelize.INTEGER,
      user_id: {
        type: INTEGER,
        references: { model: "users", key: "id" },
      },
      question: {
        type: TEXT,
      },
      answer: {
        type: TEXT,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    queryInterface.dropTable("user_security_questions");
  },
};
