import { Application } from "egg";
import { EggShell } from "egg-shell-decorators-plus";

export default (app: Application) => {
  app.model.Comment.belongsTo(app.model.User);
  app.model.User.hasMany(app.model.Comment);

  app.model.Comment.addScope("includeUserData", {
    include: [
      {
        model: app.model.User,
      },
    ],
  });

  app.model.sync().then(() => console.log("db synced"));
  const { controller, router } = app;
  router.get("/", controller.home.index);

  router.redirect("/redirect", "/", 302);
  // Authentication routes
  const github = app.passport.authenticate("github");
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

  // app.passport.verify(async (ctx, user) => {
  //   console.log(app.controller.auth);

  //   app.
  //   app.controller.auth.wireProviderCredential();
  // });

  app.passport.mount("local", {
    loginURL: "/auth/local",
  });

  EggShell(app);
};
