import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserLoginRecord = app.model.define("user_login_record", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
    },
    created_at: DATE,
    updated_at: DATE,
  });

  // model.sync();
  return UserLoginRecord;
};
