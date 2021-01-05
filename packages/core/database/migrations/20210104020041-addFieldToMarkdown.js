'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('markdowns', 'visibility', {
      type: Sequelize.ENUM('public', 'private'),
      defaultValue: 'public',
      allowNull: false,
    });

    await queryInterface.addColumn('markdowns', 'title', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('markdowns', 'title');
    await queryInterface.removeColumn('markdowns', 'visibility');
  },
};
