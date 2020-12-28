import { Context } from "egg";

module.exports = (options) => async (ctx: Context, next) => {
  if (ctx.request.query.redirect)
    ctx.cookies.set("redirect", ctx.request.query.redirect, { encrypt: true });

  await next();
};
