import { Application, IModel } from "egg";
import { v4 as uuid } from "uuid";
import { ModelCtor, Model } from "sequelize";

const modelBuilder = (app: Application, model: IModel) => {
  const { STRING, INTEGER, DATE, TEXT, UUID, UUIDV4 } = app.Sequelize;
  const Comment = model.define("comment", {
    id: {
      // type: UUID,
      // primaryKey: true,
      // defaultValue: function () {
      //   return uuid();
      // },

      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
      allowNull: false,
    },

    createdAt: DATE,
    updatedAt: DATE,
  });

  return Comment as ModelCtor<Model>;
};

export default modelBuilder;
