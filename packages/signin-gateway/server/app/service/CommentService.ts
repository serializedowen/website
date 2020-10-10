import { commentDTO } from "app/model/dto/commentDTO";
import { Service } from "egg";

export default class CommentService extends Service {
  public async addComment(data: commentDTO & { identifier: string }) {
    //@ts-ignore
    await this.ctx.user?.userModel.createComment({
      content: data.content,
      identifier: data.identifier,
    });

    this.ctx.user?.userModel.save();
  }

  public async getComments(identifier: string) {
    return await this.ctx.model.Comment.findAll({ where: { identifier } });
  }
}
