import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const { STRING, INTEGER, DATE, ENUM, BLOB, TEXT, BOOLEAN } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), unique: true, allowNull: false },
    email: { type: STRING(100), allowNull: false },
    phone: INTEGER,
    password: { type: STRING(200), allowNull: false },
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    avatar_blob: BLOB,
    avatar_url: TEXT,
    privilege: { type: ENUM("normal", "admin"), defaultValue: "normal" },
    isActive: BOOLEAN,
  });

  model.sync();
  return User;
};
