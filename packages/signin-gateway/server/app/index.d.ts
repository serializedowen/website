import { Model } from "sequelize";
declare module "egg" {
  interface Context {
    user?: { userModel: Model<any, any>; userId: number } & {
      [key in string]: any;
    };
  }
}

declare type LooseModel = Model<any, any> & { [P in string] };
