import { Controller } from "egg";

export default function OpenAPI(supportComplex: boolean = false): any {
  return (target, methodName) => {
    if (supportComplex) {
      Reflect.defineMetadata("aaa", "aaa", target[methodName]);
    }

    const current =
      Reflect.getOwnMetadata("preProcessor", target, methodName) || [];

    current.push(function (this: Controller) {
      this.ctx.set({
        "Access-Control-Allow-Origin": this.ctx.request.headers.origin,
      });
    });
    Reflect.defineMetadata("preProcessor", current, target[methodName]);
  };
}
