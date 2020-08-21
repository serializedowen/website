import { Application } from "egg";

export default (app: Application) => {
  app.model.sync();
  const { controller, router } = app;
  router.get("/", controller.home.index);

  //Authentication routes
  const github = app.passport.authenticate("github");
  app.get("/auth/github", github);
  app.get("/auth/github/callback", github);
  router.get("/auth", controller.auth.signup);
};
