import { Application, IModel } from "egg";
import { v4 as uuid } from "uuid";

module.exports = (app: Application, model: IModel) => {
  const { INTEGER, DATE, UUID, UUIDV4 } = app.Sequelize;

  const Like = model.define("like", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },

    userId: {
      type: INTEGER,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },

    commentId: {
      type: INTEGER,
      references: { model: "comments", key: "id" },
      onDelete: "CASCADE",
    },

    createdAt: DATE,
    updatedAt: DATE,
  });

  return Like;
};
