import { Application, IModel } from 'egg';

import { ModelCtor, Model } from 'sequelize';

const modelBuilder = (app: Application, model: IModel) => {
  const { INTEGER, DATE, UUID, UUIDV4, STRING } = app.Sequelize;

  const Markdown = model.define('markdown', {
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
      type: STRING,
    },

    createdAt: DATE,
    updatedAt: DATE,
  });

  return Markdown as ModelCtor<Model>;
};

export default modelBuilder;
