import { Application, IModel } from 'egg';

import { ModelCtor, Model } from 'sequelize';

const modelBuilder = (app: Application, model: IModel) => {
  const { INTEGER, DATE, UUID, UUIDV4, STRING, ENUM, TEXT } = app.Sequelize;

  const Markdown = model.define('Markdown', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },

    userId: {
      type: INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },

    content: {
      type: TEXT,
    },

    title: {
      type: STRING,
    },

    visibility: {
      type: ENUM('public', 'private'),
      defaultValue: 'public',
    },

    createdAt: DATE,
    updatedAt: DATE,
  });

  return Markdown as ModelCtor<Model>;
};

export default modelBuilder;
