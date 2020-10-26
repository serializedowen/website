import { Application, IModel } from "egg";
import { ModelCtor, Model } from "sequelize";
const modelBuilder = (app: Application, model: IModel) => {
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

  const User = model.define(
    "user",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), unique: true, allowNull: false },
      email: { type: STRING(100), allowNull: false },
      phone: { type: STRING, defaultValue: "" },
      password: { type: STRING(200), allowNull: false },
      age: INTEGER,
      salt: { type: CHAR(12), allowNull: false },
      createdAt: DATE,
      updatedAt: DATE,
      avatarBlob: BLOB,
      avatarUrl: TEXT,
      privilege: { type: ENUM("normal", "admin"), defaultValue: "normal" },
      isActive: { type: BOOLEAN, defaultValue: true },
      isCdnAvatar: { type: BOOLEAN, defaultValue: false, allowNull: false },
      isVerifiedEmail: { type: BOOLEAN, defaultValue: false, allowNull: false },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password", "salt", "privilege", "isActive"] },
        where: {
          isActive: true,
        },
      },
    }
  );

  // model.sync();
  return User as ModelCtor<Model>;
};

export default modelBuilder;
