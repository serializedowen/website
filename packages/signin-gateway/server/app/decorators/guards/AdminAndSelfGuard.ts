import { Controller } from "egg";
import { Guard } from "egg-shell-decorators-plus";

export default class AdminAndSelfGuard implements Guard {
  pipe(this: Controller): void {
    if (
      this.ctx.user?.userId.toString() === this.ctx.params.userId.toString() &&
      this.ctx.params.userId !== undefined
    ) {
    } else {
      //@ts-ignore
      if (this.ctx.user?.userModel.privilege !== "admin") this.ctx.throw(405);
    }
  }
}
