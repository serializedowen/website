import { Controller } from "egg";
import { get } from "lodash";
export default function AdminOnly(): any {
  return (target, methodName) => {
    const current =
      Reflect.getOwnMetadata("preProcessor", target, methodName) || [];

    current.push(function (this: Controller) {
      if (get(this.ctx.user, "userModel.privilege") !== "admin")
        this.ctx.throw(403);
    });

    Reflect.defineMetadata("preProcessor", current, target[methodName]);
  };
}
