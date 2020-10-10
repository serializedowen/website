import { Controller } from "egg";
import {
  Prefix,
  Get,
  Post,
  Body,
  Query,
  Header,
} from "egg-shell-decorators-plus";
import { UserDTO } from "app/model/dto/UserDTO";
import activeUserCache from "app/activeUserCache";
import Authenticated from "app/decorators/Authenticated";
@Prefix("/auth")
export default class AuthController extends Controller {
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

  @Authenticated()
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

        const record = await this.service.auth.findLinkedLocalAccountId(
          thirdPartyData.id,
          thirdPartyData.provider
        );

        if (record) {
          const user = await this.service.auth.findUserByPK(record.userId);
          activeUserCache.set(user.id, user);
          this.ctx.user.userId = user.id;
        } else {
          const user = await this.service.auth.createUser(params);
          activeUserCache.set(user.id, user);

          await this.service.auth.createProviderMetadata({
            provider: thirdPartyData.provider,
            providerId: thirdPartyData.id,
            userId: user.id,
          });

          this.ctx.user.userId = user.id;
        }

        return;
      }

      default:
        return;
    }
  }
  // public async login(username, password) {

  //   this.ctx.service.
  // }
}
