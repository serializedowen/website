import { Service } from "egg";
import crypto = require("crypto");

const secret =
  "4pzKckZH6JT4mQPXULEnL4AoRt4knDIvgRNfBkHjzxiRgtzFynaEB3NMFcd8jX/4izCde6SpBnxSn23UZL5tFA==";

function Inject(sss) {
  return (target, key, index) => {
    console.log(Reflect.getMetadata("design:type", target, key));
    console.log(Reflect.getMetadata("design:paramtypes", target, key));
    console.log(Reflect.getMetadata("design:returntype", target, key));
    return target;
  };
}

export default class Auth extends Service {
  private saltPassword(password: string) {
    console.log(Reflect.getMetadata("design:type", Auth));
    const salt = crypto.randomBytes(8).toString("base64");
    return {
      salt,
      password: crypto
        .createHmac("sha256", secret)
        .update(password.concat(salt))
        .digest("base64"),
    };
  }

  @Inject("aaa")
  public async createUser(aaa?: Service) {
    const { salt, password } = this.saltPassword("waerrar");

    return await this.app.model.User.create({
      name: "aaaaa" + Math.random(),
      email: "rea" + Math.random() + ".com",
      password,
      salt,
    });
  }
}
