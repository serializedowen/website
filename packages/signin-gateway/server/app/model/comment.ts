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
  const Comment = model.define("comment", {
    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    content: {
      type: TEXT,
    },
    identifier: {
      type: STRING,
    },

    createdAt: DATE,
    updatedAt: DATE,
  });

  return Comment;
};
