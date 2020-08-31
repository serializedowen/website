import { Controller } from "egg";
import { Prefix, Get, Post, Body, Query, Header } from "egg-shell-decorators";
import { UserDTO } from "app/model/dto/UserDTO";
@Prefix("/auth")
export default class AuthController extends Controller {
  @Reflect.metadata("aaa", "bbb")
  @Get("/aa")
  public async index(
    @Body aaa: UserDTO,
    @Query("username") username: String,
    @Header("accessToken") token: String
  ) {
    const { ctx } = this;

    console.log(aaa);
    console.log(token);
    console.log(username);
    ctx.body = await ctx.service.test.sayHi("egg");
  }

  @Post("/signup")
  public async signup() {
    const user = await this.ctx.service.auth.createUser(this.ctx.request.body);
    this.ctx.body = this.service.jwt.encode(user);
  }

  @Get("/verify-third-party-user")
  public async wireProviderCredential() {
    if (!this.ctx.user) return;

    const thirdPartyData = this.ctx.user;

    switch (thirdPartyData.provider) {
      case "github": {
        const params: Partial<userDAO> = {};

        params.avatarUrl = thirdPartyData.photo;
        params.name = thirdPartyData.name;
        params.password = "123456";

        const user = await this.service.auth.createUser(params);

        await this.service.auth.createProviderMetadata({
          provider: thirdPartyData.provider,
          providerId: thirdPartyData.id,
          userId: user.id,
        });

        return this.service.jwt.encode(user);
      }
    }
  }
  // public async login(username, password) {

  //   this.ctx.service.
  // }
}
