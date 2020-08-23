import jwt = require("jsonwebtoken");
import crypto = require("crypto");
import { Service } from "egg";
import authSecret from "config/auth.secret";

export default class JWTService extends Service {
  public encode(data: Record<string, any>) {
    let user;

    //check if data is sequelize model
    if (data.dataValues) user = data.dataValues;
    else user = data;

    return jwt.sign(
      {
        username: user.name,
        email: user.email,
        age: user.age,
        privilege: user.privilege,
        avatarUrl: user.avatarUrl,
        sessionId: "",
      },
      authSecret,
      {
        algorithm: "HS256",
        expiresIn: "2h",
      }
    );
  }

  public decode(token: string) {
    return jwt.verify(token, authSecret);
  }
}
