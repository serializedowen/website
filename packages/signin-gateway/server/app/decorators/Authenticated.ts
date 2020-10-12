import { Controller } from "egg";

export default function Authenticated(redirectRoute: string = "/login"): any {
  return (target, methodName) => {
    Reflect.defineMetadata(
      "preProcessor",
      function (this: Controller) {
        if (!this.ctx.user) this.ctx.throw("unauthorizied", 401, {});
      },
      target[methodName]
    );
  };
}
