module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      ENUM,
      CHAR,
      DATE,
      BLOB,
      TEXT,
      BOOLEAN,
    } = Sequelize;
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.createTable("users", {
      name: { type: STRING(30), unique: true, allowNull: false },
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), unique: true, allowNull: false },
      email: { type: STRING(100), allowNull: false },
      phone: INTEGER,
      password: { type: STRING(200), allowNull: false },
      age: INTEGER,
      salt: { type: CHAR(12), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      avatar_blob: BLOB,
      avatar_url: TEXT,
      privilege: { type: ENUM("normal", "admin"), defaultValue: "normal" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    queryInterface.dropTable("users");
  },
};
