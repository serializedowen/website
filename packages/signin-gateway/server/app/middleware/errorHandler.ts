import { Context } from "egg";

module.exports = (options) => async (ctx: Context, next) => {
  try {
    await next();
  } catch (e) {
    ctx.response.body = e;
    ctx.status = 500;
  }
};
