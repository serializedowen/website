import { Service } from "egg";
import crypto = require("crypto");

const secret =
  "4pzKckZH6JT4mQPXULEnL4AoRt4knDIvgRNfBkHjzxiRgtzFynaEB3NMFcd8jX/4izCde6SpBnxSn23UZL5tFA==";

export default class Auth extends Service {
  private saltPassword(password: string) {
    const salt = crypto.randomBytes(8).toString("base64");
    return {
      salt,
      password: crypto
        .createHmac("sha256", secret)
        .update(password.concat(salt))
        .digest("base64"),
    };
  }

  public verifyPassword(password: string, salt: string) {
    return crypto
      .createHmac("sha256", secret)
      .update(password.concat(salt))
      .digest("base64");
  }

  /**
   *
   */
  public recordLogin(userId: string) {}

  public async createProviderMetadata(record: thirdPartyUserRecordDAO) {
    return this.app.model.ThirdPartyUserRecords.create(record);
  }

  public async findLinkedLocalAccountId(providerId: string, provider: string) {
    return this.app.model.ThirdPartyUserRecords.findOne({
      where: { provider, providerId },
    });
  }

  public async findUserByPK(id: number) {
    return await this.app.model.User.findByPk(id);
  }

  public async createUser(userData: Partial<userDAO>) {
    const { salt, password } = this.saltPassword(userData.password as string);

    return await this.app.model.User.create({
      name: userData.name,
      email: userData.email || "placeholder@example.com",
      avatarUrl: userData.avatarUrl,
      password,
      salt,
    });
  }
}
