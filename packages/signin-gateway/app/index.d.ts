import { Model } from "sequelize";
declare module "egg" {
  interface Context {
    user?: { userModel: Model<any, any>; userId: number } & {
      [key in string]: any;
    };

    /**
     * Render a file by view engine
     * @param {String} name - the file path based on root
     * @param {Object} [locals] - data used by template
     * @param {Object} [options] - view options, you can use `options.viewEngine` to specify view engine
     * @return {Promise<String>} result - return a promise with a render result
     */
    renderView(
      name: string,
      locals?: any,
      options?: RenderOptions
    ): Promise<string>;
  }
}

declare type LooseModel = (Model<any, any> & { [P in string] }) | undefined;
