import * as qiniu from "qiniu";
import { AccessKey, SecretKey } from "config-storage/qiniu";

const config = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2,
  useCdnDomain: true,
  useHttpsDomain: true,
});

const mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
const putPolicy = new qiniu.rs.PutPolicy({
  scope: "serializedowen",
});

export default {
  qiniu: {
    getUploadToken: (fileKey?: string) => {
      if (fileKey) {
        return new qiniu.rs.PutPolicy({
          scope: "serializedowen:" + fileKey,
        }).uploadToken(mac);
      } else {
        return putPolicy.uploadToken(mac);
      }
    },

    getPutExtras: () => new qiniu.form_up.PutExtra(),

    // getPutExtras: (...args: Parameters<qiniu.form_up.PutExtra>) =>
    //   new qiniu.form_up.PutExtra(),
    formUploader: new qiniu.form_up.FormUploader(config),
  },
};
