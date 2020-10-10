import { Model } from "sequelize";
declare module "egg" {
  interface Context {
    user?: { userModel: Model; userId: string } & { [key in string]: any };
  }
}
