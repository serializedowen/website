import { Controller } from "egg";
import { Post, Prefix } from "egg-shell-decorators-plus";
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
    else
      await this.ctx.service.avatarService.uploadAvatar(
        this.ctx.request.files[0]
      );

    // this.app.runInBackground()
  }
}
