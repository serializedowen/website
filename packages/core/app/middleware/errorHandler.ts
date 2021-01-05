import { Context } from "egg";

module.exports = (options) => async (ctx: Context, next) => {
  try {
    await next();
  } catch (e) {
    if (process.env.NODE_ENV !== "production") throw e;
    ctx.status = e.status || 500;
    ctx.body = { message: e.message };
  }
};
