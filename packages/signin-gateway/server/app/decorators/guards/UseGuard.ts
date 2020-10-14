import { Guard } from "egg-shell-decorators-plus";

export default function UseGuard(...Guards: { new (): Guard }[]) {
  return (target, methodName) => {
    const current =
      Reflect.getOwnMetadata("preProcessor", target, methodName) || [];

    current.push(...Guards.map((guard) => new guard().pipe));

    Reflect.defineMetadata("preProcessor", current, target[methodName]);
  };
}
