import { EggPlugin } from "egg";
const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  fullQiniu: {
    enable: true,
    package: "egg-full-qiniu",
  },

  pug: {
    enable: true,
    package: "egg-view-pug",
  },

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

  passportFacebook: {
    enable: true,
    package: "egg-passport-facebook",
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
