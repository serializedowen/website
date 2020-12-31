import { IModel } from 'egg';

export default function addRelations(model: IModel) {
  model.Like.belongsTo(model.User);
  model.Like.belongsTo(model.Comment);

  model.User.hasMany(model.Like);
  model.User.hasMany(model.Comment);

  model.Comment.hasMany(model.Like);
  model.Comment.belongsTo(model.User);

  model.User.hasMany(model.UserLoginRecord);
  model.UserLoginRecord.belongsTo(model.User);

  model.User.hasMany(model.Markdown);
  model.Markdown.belongsTo(model.User);
}
