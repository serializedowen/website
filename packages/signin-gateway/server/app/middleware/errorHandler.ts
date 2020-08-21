import { Context } from "egg";

module.exports = (options) => async (ctx: Context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    ctx.body = e;
  }
};
