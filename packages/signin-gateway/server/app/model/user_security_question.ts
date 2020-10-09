import { Application, IModel } from "egg";

module.exports = (app: Application, model: IModel) => {
  const { INTEGER, TEXT } = app.Sequelize;

  const UserSecurityQuestion = app.model.define("user_security_question", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    question: {
      type: TEXT,
    },
    answer: {
      type: TEXT,
    },
  });

  // model.sync();
  return UserSecurityQuestion;
};
