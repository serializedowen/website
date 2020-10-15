import { Application, IModel } from "egg";
import { ModelCtor, Model } from "sequelize";
const modelBuilder = (app: Application, model: IModel) => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserLoginRecord = app.model.define("user_login_record", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    createdAt: DATE,
    updatedAt: DATE,
  });

  // model.sync();
  return UserLoginRecord as ModelCtor<Model>;
};
export default modelBuilder;
