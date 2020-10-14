import AdminOnlyGuard from "app/decorators/guards/AdminAndSelfGuard";
import UseGuard from "app/decorators/guards/UseGuard";
import { Controller } from "egg";
import { Get, Prefix } from "egg-shell-decorators-plus";

@Prefix("/")
export default class HomeController extends Controller {
  @Get("/")
  public async index() {
    const { ctx } = this;

    ctx.body = await ctx.service.test.sayHi("egg");
  }
}
