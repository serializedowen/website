import { Context } from "egg";
import activeUserCache from "app/activeUserCache";
import { Model } from "sequelize";

module.exports = () => async (ctx: Context, next) => {
  if (ctx.user && ctx.user.userId) {
    if (activeUserCache.has(ctx.user.userId)) {
      const model = activeUserCache.get(ctx.user.userId);

      model && activeUserCache.set(ctx.user.userId, model);
    } else {
      const model = await ctx.service.auth.findUserByPK(ctx.user.userId);

      if (model) {
        activeUserCache.set(ctx.user.userId, model);

        ctx.user.userModel = model;
      }
    }
  }
  await next();
};
