"use strict";
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.bulkUpdate(
    //   "users",
    //   {
    //     uuid: uuid.v4(),
    //   },
    //   null,
    //   { individualHooks: true }
    // );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
