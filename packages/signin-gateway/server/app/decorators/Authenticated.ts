import { Controller } from "egg";

export default function Authenticated(redirectRoute: string = "/login"): any {
  return (target, methodName) => {
    const current =
      Reflect.getOwnMetadata("preProcessor", target, methodName) || [];

    current.push(function (this: Controller) {
      if (!this.ctx.isAuthenticated()) this.ctx.throw(401);
    });

    Reflect.defineMetadata("preProcessor", current, target[methodName]);
  };
}
