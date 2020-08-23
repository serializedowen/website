import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import sqlConfig from "./sql.config";
import "reflect-metadata";
import "tsconfig-paths/register";
import { app } from "egg-mock/bootstrap";
import { configLoader } from "tsconfig-paths/lib/config-loader";

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

  config.security = {
    csrf: false,
  };

  config.passportLocal = {};

  config.passportGoogle = {
    key:
      "632750028016-qro4a89m54abms5glei8qqe9nacdvt2n.apps.googleusercontent.com",
    secret: "bBY0xf3snRXnQFQaLMO8FlFt",
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    sequelize: sqlConfig,
  };
};
