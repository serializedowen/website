import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  passport: {
    enable: true,
    package: "egg-passport",
  },
  passportGithub: {
    enable: true,
    package: "egg-passport-github",
  },

  passportGoogle: {
    enable: true,
    package: "egg-passport-google",
  },

  passportLocal: {
    enable: true,
    package: "egg-passport-local",
  },

  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
};

export default plugin;
