import { Controller } from "egg";
import {
  Prefix,
  Get,
  Post,
  Body,
  Query,
  Header,
  Param,
  Guard,
} from "egg-shell-decorators-plus";
import { UserDTO } from "app/model/dto/UserDTO";
import activeUserCache from "app/activeUserCache";
import Authenticated from "app/decorators/Authenticated";
import { pick } from "lodash";

import UseGuard from "app/decorators/guards/UseGuard";
import AdminAndSelfGuard from "app/decorators/guards/AdminAndSelfGuard";
import { LooseModel } from "app";
import { CreateUserDTO } from "app/model/dto/CreateUserDTO";

@Prefix("/auth")
export default class AuthController extends Controller {
  constructor(props) {
    super(props);
  }

  @Get("/password/reset")
  public async passwordReset() {
    this.ctx.service.emailService.sendEmail({
      to: "serializedowen@163.com",
      subject: "111",
      text: "111",
    });
  }

  @Post("/register")
  public async register(@Body data: CreateUserDTO) {
    await this.ctx.service.auth.createUser(data);
  }

  @Get("/availability/name")
  public async checkNameAvailability(@Query("name") name: string) {
    const model = await this.ctx.model.User.findOne({ where: { name } });
    this.ctx.body = !!model;
  }

  @Get("/check")
  public async check() {
    if (this.ctx.isAuthenticated()) this.ctx.status = 200;
    else this.ctx.status = 401;
  }

  @Get("/verify-email")
  @Authenticated()
  public async verifyEmail(@Query("SESSIONID") session: string) {
    if (session) {
      try {
        const data = this.service.jwt.decode(session);
        await this.service.emailService.updateUserEmailStatus(data.userId);
        await this.ctx.render("redirecting.pug", { url: data.redirect });
      } catch (e) {
        this.logger.error(e);
        this.ctx.throw(400, "SESSIONID错误或已过期");
      }
    } else {
      const res = await this.service.emailService.verifyUserEmail();
      if (res.status !== 200) this.ctx.throw(500, "email发送遇到未知错误");
    }
  }

  @Get("/decodeToken")
  @Authenticated(400)
  public decodeToken() {
    this.ctx.body = this.ctx.user;
  }

  @Get("/signout")
  public async signout() {
    this.ctx.logout();
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

    this.ctx.status = 200;

    switch (thirdPartyData.provider) {
      case "local": {
        try {
          const user = <LooseModel>await this.app.model.User.unscoped().findOne(
            {
              where: { name: thirdPartyData.username },
            }
          );
          if (user) {
            const pwd = this.service.auth.verifyPassword(
              thirdPartyData.password,
              user.salt
            );

            if (pwd === user.password) {
              this.ctx.user.userId = user.id;
              this.ctx.user.userModel = user;
              activeUserCache.set(user.id, user);
            } else {
              this.ctx.throw(401);
            }
          } else {
            this.ctx.throw(401);
          }
          break;
        } catch (e) {
          this.ctx.logout();
          throw e;
        }
      }
      case "github": {
        const params: Partial<userDAO> = {};

        params.avatarUrl = thirdPartyData.photo;
        params.name = thirdPartyData.name;
        params.password = "123456";

        const record = <LooseModel>(
          await this.service.auth.findLinkedLocalAccountId(
            thirdPartyData.id,
            thirdPartyData.provider
          )
        );

        if (record) {
          const user = <LooseModel>(
            await this.service.auth.findUserByPK(record.userId)
          );

          if (user) {
            activeUserCache.set(user.id, user);
            this.ctx.user.userId = user.id;
          }
        } else {
          const user = <LooseModel>await this.service.auth.createUser(params);

          if (user) {
            activeUserCache.set(user.id, user);

            await this.service.auth.createProviderMetadata({
              provider: thirdPartyData.provider,
              providerId: thirdPartyData.id,
              userId: user.id,
            });

            this.ctx.user.userId = user.id;
          }
        }

        break;
      }

      default:
    }

    const redirectUrl = this.ctx.cookies.get("redirect", { encrypt: true });
    if (redirectUrl) {
      this.ctx.cookies.set("redirect", null);
      this.ctx.redirect(redirectUrl);
    }
  }

  @Get("/:userId")
  @UseGuard(AdminAndSelfGuard)
  @Authenticated()
  public async getUserData(@Param("userId") userId: number) {
    const user = await this.ctx.service.auth.findUserByPK(Number(userId));

    if (user) this.ctx.body = user;
    else this.ctx.status = 404;
  }

  @Post("/:userId/update")
  @UseGuard(AdminAndSelfGuard)
  @Authenticated()
  public async updateUserInfo(
    @Param("userId") userId: string,
    @Body updated: UserDTO
  ) {
    const m = await this.ctx.user?.userModel.update(
      pick(updated, ["phone", "age", "name", "email"])
    );
  }
}
