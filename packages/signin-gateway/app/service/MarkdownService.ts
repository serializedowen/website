import { Service } from 'egg';
import { Op, FindOptions } from 'sequelize';
export default class MarkdownService extends Service {
  public async addMarkdown(content: string) {
    //@ts-ignore
    const md = await this.ctx.user?.userModel.createMarkdown({
      content,
    });

    this.ctx.user?.userModel.save();

    return md;
  }

  public async updateMarkdown(content: string, id: string) {
    console.log(this.ctx.user?.userModel);

    //@ts-ignore
    const mds = await this.ctx.user?.userModel.getMarkdowns({ where: { id } });

    if (!mds[0]) return false;

    mds[0].content = content;
    mds[0].save();
    return true;
  }

  public async getVisibleMarkdowns() {
    const findOptions: FindOptions = {
      where: {
        [Op.or]: {
          visibility: 'public',
        },
      },
      include: [
        {
          model: this.ctx.model.MarkdownCollaborators,
          // include: [
          //   {
          //     model: this.ctx.model.User,
          //     attributes: ['id', 'name', 'avatarUrl'],
          //   },
          // ],
        },
        { model: this.ctx.model.User, attributes: ['id', 'name', 'avatarUrl'] },
        // {
        //   model: this.ctx.model.User,
        //   as: 'collaborators',
        //   association: 'MarkdownCollaborators',
        // },
      ],
    };

    if (this.ctx.user?.userId) {
      console.log(this.ctx.user.userId);
      //@ts-ignore
      findOptions.where.userId = this.ctx.user?.userModel.id;
    }

    const mds = await this.ctx.model.Markdown.findAll(findOptions);

    // await mds.forEach((md) =>
    //   //@ts-ignore
    //   md.addMarkdownCollaborator(this.ctx.user?.userModel)
    // );
    return mds;
  }

  public async getMarkdown(identifier: string) {
    return await this.ctx.model.Markdown.findOne({ where: { id: identifier } });
  }
}
