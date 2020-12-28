import { Service } from "egg";
import { EggFile } from "egg-multipart";
import { cdnUrl } from "config-storage/qiniu";

export default class AvatarService extends Service {
  public async uploadAvatar(filePath: string | Buffer) {
    const result: any = await new Promise((resolve, reject) => {
      if (filePath instanceof Buffer) {
        this.app.qiniu.formUploader.putWithoutKey(
          this.ctx.app.qiniu.getUploadToken(),
          filePath,
          null,
          (error, body, info) => {
            if (error) reject(error);
            else resolve(body);
          }
        );
      } else
        this.ctx.app.qiniu.formUploader.putFileWithoutKey(
          this.ctx.app.qiniu.getUploadToken(),
          filePath,
          null,
          (error, body, info) => {
            if (error) reject(error);
            else resolve(body);
          }
        );
    });

    // this.app.runInBackground
    await this.ctx.user?.userModel.update({
      avatarUrl: cdnUrl + "/" + result.key,
      isCdnAvatar: true,
    });

    return cdnUrl + "/" + result.key;
  }
}
