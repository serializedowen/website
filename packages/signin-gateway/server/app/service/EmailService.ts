import { Service } from "egg";

// import pug from "pug";
// import { join } from "path";
// const verifyTemplate = pug.compileFile(
//   join(__dirname, "../view/verifyEmail.pug")
// );

export default class EmailService extends Service {
  public async verifyUserEmail() {
    //@ts-ignore
    const email = this.ctx.user?.userModel.email;

    if (!email) this.ctx.throw(400, "no email associated with this account.");
    else {
      const jwt = this.service.jwt.encode(
        { userId: this.ctx.user?.userId, email },
        "1h"
      );

      const html = await this.ctx.renderString("verifyEmail.pug", {
        url: `http://localhost:7001/auth/verifier?SESSIONID=${jwt}`,
      });

      this.sendEmail({
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

    console.log({ to, text, subject, html });
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
        this.logger.info("sending email to " + to);
        return response;
      });
  }
}
