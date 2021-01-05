import { EggAppConfig, PowerPartial } from "egg";
import sqlconfig from "./sql.config.prod";
export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  const session = { domain: "serializedowen.com" };
  const appDomain = "https://serializedowen.com";

  return { ...config, appDomain, session, sequelize: sqlconfig };
};
