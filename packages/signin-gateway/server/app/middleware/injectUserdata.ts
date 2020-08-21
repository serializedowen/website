module.exports = (options) => async (ctx, next) => {
  await next();
};
