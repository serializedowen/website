import { Model } from "sequelize";
declare module "egg" {
  interface Context {
    user?: { userModel: Model; userId: number } & { [key in string]: any };
  }
}
