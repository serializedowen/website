import { Controller } from "egg";
import { Post, Prefix } from "egg-shell-decorators-plus";
import sharp from "sharp";
// import qiniu from 'qiniu'

@Prefix("/image")
export default class ImageController extends Controller {
  @Post("/upload")
  public async upload() {
    if (
      this.ctx.request.files.length === 0 ||
      this.ctx.request.files.length > 1
    )
      this.ctx.throw(400);
    else {
      const img = this.ctx.request.files[0];
      sharp(img.filepath);
      await this.ctx.service.avatarService.uploadAvatar(img);
    }

    // this.app.runInBackground()
  }
}
