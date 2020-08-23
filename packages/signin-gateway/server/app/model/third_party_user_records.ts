import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const Record = app.model.define("third_party_user_record", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
    },
    provider: STRING,
    providerId: STRING,
    createdAt: DATE,
    updated: DATE,
  });

  // model.sync();
  return Record;
};
