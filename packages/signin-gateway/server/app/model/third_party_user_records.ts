import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const Record = app.model.define("third_party_user_record", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    provider: STRING,
    providerId: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });

  // model.sync();
  return Record;
};
