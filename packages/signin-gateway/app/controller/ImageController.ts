import { Controller } from "egg";
import { Post, Prefix, Query } from "egg-shell-decorators-plus";

import sharp from "sharp";
// import qiniu from 'qiniu'

@Prefix("/image")
export default class ImageController extends Controller {
  @Post("/upload")
  public async upload(
    @Query("x") x: string,
    @Query("y") y: string,
    @Query("width") width: string,
    @Query("height") height: string
  ) {
    if (
      this.ctx.request.files.length === 0 ||
      this.ctx.request.files.length > 1
    )
      this.ctx.throw(400);
    else {
      const img = this.ctx.request.files[0];

      if (!!x && !!y && !!width && !!height) {
        const file = await sharp(img.filepath)
          .extract({
            top: parseInt(y),
            left: parseInt(x),
            width: parseInt(width),
            height: parseInt(height),
          })
          .toBuffer();

        this.ctx.body = await this.ctx.service.avatarService.uploadAvatar(file);
      } else
        this.ctx.body = await this.ctx.service.avatarService.uploadAvatar(
          img.filepath
        );
    }

    // this.app.runInBackground()
  }
}
