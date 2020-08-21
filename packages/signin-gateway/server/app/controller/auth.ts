import { Controller } from "egg";

export default class AuthController extends Controller {
  public async index() {
    const { ctx } = this;

    ctx.body = await ctx.service.test.sayHi("egg");
  }

  public async signup() {
    console.log(this.ctx.request.body);
    await this.ctx.service.auth.createUser();
    this.ctx.status = 200;
  }

  // public async login(username, password) {

  //   this.ctx.service.
  // }
}
