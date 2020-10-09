import { Service } from "egg";

export default class CommentService extends Service {
  public async addComment(comment) {
    const user = this.ctx.user.userObject;

    console.log(user);
  }
}
