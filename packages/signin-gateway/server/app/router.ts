import { Application } from "egg";
import { EggShell } from "egg-shell-decorators-plus";
import addRelations from "./relations";
import addScopes from "./scopes";

export default (app: Application) => {
  addRelations(app.model);
  addScopes(app.model);

  app.model.sync().then(() => console.log("db synced"));
  const { router } = app;

  router.redirect("/redirect", "/", 302);
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
