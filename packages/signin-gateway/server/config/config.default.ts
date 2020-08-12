import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import sqlConfig from "./sql.config";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1597134785968_369";

  // add your egg config in here
  config.middleware = ["injectUserdata"];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    sequelize: sqlConfig,
  };
};
