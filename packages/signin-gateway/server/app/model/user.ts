import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const {
    STRING,
    INTEGER,
    DATE,
    ENUM,
    BLOB,
    TEXT,
    BOOLEAN,
    CHAR,
  } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), unique: true, allowNull: false },
    email: { type: STRING(100), allowNull: false },
    phone: INTEGER,
    password: { type: STRING(200), allowNull: false },
    age: INTEGER,
    salt: { type: CHAR(12), allowNull: false },
    createdAt: DATE,
    updatedAt: DATE,
    avatarBlob: BLOB,
    avatarUrl: TEXT,
    privilege: { type: ENUM("normal", "admin"), defaultValue: "normal" },
    isActive: { type: BOOLEAN, defaultValue: true },
  });

  // model.sync();
  return User;
};