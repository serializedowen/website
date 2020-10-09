import { Application } from "egg";
import { EggShell } from "egg-shell-decorators-plus";

export default (app: Application) => {
  app.model.Comment.belongsTo(app.model.User, {
    as: "comment",
    foreignKey: "user_id",
  });

  app.model.sync();
  const { controller, router } = app;
  router.get("/", controller.home.index);

  // Authentication routes
  // const github = app.passport.authenticate("github");
  // app.get("/auth/github", github);
  // app.get("/auth/github/callback", github);

  app.passport.mount("github", {
    loginURL: "/auth/github",
    callbackURL: "/auth/github/callback",
    successRedirect: "/auth/verify-third-party-user",
  });

  app.passport.mount("google", {
    loginURL: "/auth/google",
    callbackURL: "/auth/google/callback",
    successRedirect: "/auth/verify-third-party-user",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
  });

  app.passport.mount("local", {
    loginURL: "/auth/local",
  });

  EggShell(app);
};
