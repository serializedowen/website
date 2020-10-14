import { Controller } from "egg";
import { Post, Prefix } from "egg-shell-decorators-plus";
// import qiniu from 'qiniu'

@Prefix("/image")
export default class ImageController extends Controller {
  @Post("/upload")
  public async upload() {
    console.log(this.ctx);
  }
}
