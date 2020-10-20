import { Application, Request, Context } from "egg";
import { EggShell } from "egg-shell-decorators-plus";
import addRelations from "./relations";
import addScopes from "./scopes";
import { Strategy as LocalStrategy } from "passport-local";
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

  // app.passport.use(
  //   new LocalStrategy(
  //     {
  //       passReqToCallback: true,
  //     },
  //     (req, username, password, done) => {
  //       const user = {
  //         provider: "local",
  //         username,
  //         password,
  //       };

  //       app.passport.doVerify((req as any) as Request, user, done);

  //     }
  //   )
  // );

  // app.passport.verify(async (ctx:Context, user) => {

  //   console.log(user)
  //   if (user.provider === 'local')
  //     console.log(user)

  // })

  app.passport.mount("local", {
    loginURL: "/auth/local",
    callbackURL: "/auth/local/callback",
    successRedirect: "/auth/verify-third-party-user",
  });

  EggShell(app);
};
