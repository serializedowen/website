import { Controller } from "egg";

export default class AuthController extends Controller {
  public async index() {
    const { ctx } = this;

    console.log("eraaea");
    ctx.body = await ctx.service.test.sayHi("egg");
  }

  // public async login(username, password) {

  //   this.ctx.service.
  // }
}
