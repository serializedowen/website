import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  console.log(controller);
  router.get("/auth", controller.auth.index);

  router.get("/", controller.home.index);
};
