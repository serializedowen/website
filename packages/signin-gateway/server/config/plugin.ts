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

  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
};

export default plugin;
