import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import sqlConfig from "./sql.config";
import "reflect-metadata";
import "tsconfig-paths/register";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1597134785968_369";

  // add your egg config in here
  config.middleware = ["injectUserdata", "errorHandler"];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.passportGithub = {
    key: "c13c72ca5ca3c0866d58",
    secret: "5aab69ea9d6d7d438097099aadafcc9b5422e778",
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    sequelize: sqlConfig,
  };
};
