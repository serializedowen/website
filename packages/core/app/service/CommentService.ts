import { commentDTO } from 'app/model/dto/commentDTO';
import { Service } from 'egg';

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
      'includeUserData'
    ).findAll({
      where: { identifier },
      order: [['createdAt', 'DESC']],
      include: [{ model: this.ctx.model.Like, attributes: ['id', 'userId'] }],
    });

    return comments;
  }

  public async deleteComment(commentId: string) {
    if (!this.ctx.user?.userId) this.ctx.throw(403);
    await this.ctx.model.Comment.destroy({
      where: { id: commentId, userId: this.ctx.user?.userId },
    });
  }

  public async unlikeComment(commentId: string) {
    const like = await this.ctx.model.Like.findOne({
      where: { commentId, userId: String(this.ctx.user?.userId) },
    });
    //@ts-ignore
    this.ctx.user.userModel.removeLike(like);
    like?.destroy();
  }

  public async likeComment(commentId: string) {
    const comment = await this.ctx.model.Comment.findByPk(commentId);

    // //@ts-ignore
    // const a = await comment.hasLike({:
    //   where: { userId: this.ctx.user?.userId },
    // });

    //@ts-ignore
    const like = await this.ctx.user?.userModel.createLike({});

    //@ts-ignore
    comment.addLike(like);

    // transaction.commit();
  }
}
