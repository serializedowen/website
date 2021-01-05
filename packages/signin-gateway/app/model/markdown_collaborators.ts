import { Application, IModel } from 'egg';

import { ModelCtor, Model } from 'sequelize';

const modelBuilder = (app: Application, model: IModel) => {
  const { INTEGER, DATE, UUID } = app.Sequelize;

  const Markdown = model.define('MarkdownCollaborator', {
    userId: {
      type: INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },

    markdownId: {
      type: UUID,
      references: { model: 'markdowns', key: 'id' },
      onDelete: 'CASCADE',
    },
    createdAt: DATE,
    updatedAt: DATE,
  });

  Markdown.removeAttribute('id');
  return Markdown as ModelCtor<Model>;
};

export default modelBuilder;
