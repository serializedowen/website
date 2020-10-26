import jwt = require("jsonwebtoken");
import crypto = require("crypto");
import { Service } from "egg";
import authSecret from "config/auth.secret";

export default class JWTService extends Service {
  public encode(data, expiresIn) {
    return jwt.sign(data, authSecret, { algorithm: "HS256", expiresIn });
  }

  public decode(token: string) {
    return jwt.verify(token, authSecret);
  }
}
