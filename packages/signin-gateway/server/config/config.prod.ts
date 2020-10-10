import { EggAppConfig, PowerPartial } from "egg";
import sqlconfig from "./sql.config.prod";
export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  return { ...config, sequelize: sqlconfig };
};
