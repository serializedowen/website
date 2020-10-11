import { Controller } from "egg";

export default function OpenAPI(supportComplex: boolean = false): any {
  return (target, methodName) => {
    if (supportComplex) {
      Reflect.defineMetadata("aaa", "aaa", target[methodName]);
    }

    Reflect.defineMetadata(
      "preProcessor",
      function (this: Controller) {
        this.ctx.set({
          "Access-Control-Allow-Origin": this.ctx.request.headers.origin,
        });
      },
      target[methodName]
    );
  };
}
