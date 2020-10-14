import { Service } from "egg";
import { EggFile } from "egg-multipart";
import { cdnUrl } from "config-storage/qiniu";
export default class AvatarService extends Service {
  public async uploadAvatar(file: EggFile) {
    const result: any = await new Promise((resolve, reject) => {
      this.ctx.app.qiniu.formUploader.putFileWithoutKey(
        this.ctx.app.qiniu.getUploadToken(),
        file.filepath,
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

    this.ctx.body = cdnUrl + "/" + result.key;
  }
}
