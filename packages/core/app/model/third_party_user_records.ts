import { Application, IModel } from 'egg';
import { ModelCtor, Model } from 'sequelize';
const modelBuilder = (app: Application, model: IModel) => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const Record = app.model.define('ThirdPartyUserRecord', {
    userId: {
      type: INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    provider: STRING,
    providerId: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });

  // model.sync();
  return Record as ModelCtor<Model>;
};

export default modelBuilder;
