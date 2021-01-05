import { Service } from "egg";

// import pug from "pug";
// import { join } from "path";
// const verifyTemplate = pug.compileFile(
//   join(__dirname, "../view/verifyEmail.pug")
// );

export default class EmailService extends Service {
  public async updateUserEmailStatus(userId: number) {
    const user = await this.ctx.model.User.findByPk(userId);
    return await user?.update({ isVerifiedEmail: true });
  }

  public async verifyUserEmail() {
    //@ts-ignore
    const email = this.ctx.user?.userModel.email;

    if (!email) this.ctx.throw(400, "no email associated with this account.");
    else {
      const jwt = this.service.jwt.encode(
        {
          userId: this.ctx.user?.userId,
          email,
          redirect: this.config.appDomain,
        },
        "1h"
      );

      const html = await this.ctx.renderView("verifyEmail.pug", {
        url: `${this.ctx.origin}/auth/verify-email?SESSIONID=${jwt}`,
      });

      return this.sendEmail({
        to: email,
        subject: "验证邮箱",
        html,
      });
    }
  }

  public async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    this.logger.info("sending email to " + to);

    this.logger.info(
      `${this.app.config.emailServer.host}:${this.app.config.emailServer.port}/send`
    );

    return this.app
      .curl(
        `${this.app.config.emailServer.host}:${this.app.config.emailServer.port}/send`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },

          data: { to, subject, text, html },
        }
      )
      .then((response) => {
        if (response.status >= 400) return Promise.reject(response);
        this.logger.info("sent email to " + to);
        return response;
      });
  }
}
