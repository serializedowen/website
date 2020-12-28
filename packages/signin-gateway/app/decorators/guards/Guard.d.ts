import { Controller } from "egg";

declare module "egg-shell-decorators-plus" {
  interface Guard {
    pipe(this: Controller): void;
  }
}
