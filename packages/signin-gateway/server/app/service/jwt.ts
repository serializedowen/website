import jwt = require("jsonwebtoken");
import crypto = require("crypto");
import { Service } from "egg";
import authSecret from "config/auth.secret";

export default class JWTService extends Service {
  public encode(data: Record<string, any>) {
    return jwt.sign({ ...data }, authSecret, {
      algorithm: "HS256",
      expiresIn: "2h",
    });
  }

  public decode(token: string) {
    return jwt.verify(token, authSecret);
  }
}
