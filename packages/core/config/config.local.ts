import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const session = { domain: "localhost" };

  const appDomain = "http://localhost:8000";

  const config: PowerPartial<EggAppConfig> = {};
  return { ...config, appDomain, session };
};
