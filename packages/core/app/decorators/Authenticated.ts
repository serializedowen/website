import { Controller } from "egg";

export default function Authenticated(status: number = 401): any {
  return (target, methodName) => {
    const current =
      Reflect.getOwnMetadata("preProcessor", target, methodName) || [];

    current.push(function (this: Controller) {
      if (!this.ctx.isAuthenticated()) this.ctx.throw(status);
    });

    Reflect.defineMetadata("preProcessor", current, target[methodName]);
  };
}
