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
    const comments = await this.ctx.model.Comment.scope(
      "includeUserData"
    ).findAll({
      where: { identifier },
      order: [["createdAt", "DESC"]],
      include: [{ model: this.ctx.model.Like }],
    });

    return comments;
  }

  public async deleteComment(commentId: string) {
    if (!this.ctx.user?.userId) this.ctx.throw(403);
    await this.ctx.model.Comment.destroy({
      where: { id: commentId, userId: this.ctx.user?.userId },
    });
  }

  public async likeComment(commentId: string, identifier: string) {
    //@ts-ignore

    // const transaction = new this.app.Sequelize.Transaction();

    try {
      //@ts-ignore
      const like = await this.ctx.user?.userModel.createLike({});
      const comment = await this.ctx.model.Comment.findByPk(commentId);

      //@ts-ignore
      comment.addLike(like);

      // transaction.commit();
    } catch (e) {
      console.log(e);
      // transaction.rollback();
    }
  }
}
