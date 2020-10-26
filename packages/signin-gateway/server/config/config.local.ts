import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const session = { domain: "localhost" };

  const appDomain = "localhost:7001";

  const config: PowerPartial<EggAppConfig> = {};
  return { ...config, appDomain, session };
};
