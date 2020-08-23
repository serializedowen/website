import { Controller } from "egg";

export default class AuthController extends Controller {
  public async index() {
    const { ctx } = this;

    ctx.body = await ctx.service.test.sayHi("egg");
  }

  public async signup() {
    const user = await this.ctx.service.auth.createUser(this.ctx.request.body);
    this.ctx.body = this.service.jwt.encode(user);
  }

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
