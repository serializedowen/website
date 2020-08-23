import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserLoginRecord = app.model.define("user_login_record", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
    },
    createdAt: DATE,
    updatedAt: DATE,
  });

  // model.sync();
  return UserLoginRecord;
};