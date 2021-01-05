'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('markdown_collaborators', {
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      markdown_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('markdown_collaborators');
  },
};
