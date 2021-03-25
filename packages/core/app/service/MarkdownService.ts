import { MarkdownVisibility } from '@serializedowen/enums';
import { MarkdownDTO } from 'app/model/dto/MarkdownDTO';
import { Service } from 'egg';
import { Op, FindOptions } from 'sequelize';
export default class MarkdownService extends Service {
  public async addMarkdown(markdown: MarkdownDTO) {
    //@ts-ignore
    const model = await this.ctx.user?.userModel.createMarkdown({
      content: markdown.content,
      visibility: markdown.visibility || MarkdownVisibility.PRIVATE,
    });

    return model;
  }

  public async updateMarkdown(markdown: MarkdownDTO, id: string) {
    //@ts-ignore
    const mds = await this.ctx.user?.userModel.getMarkdowns({ where: { id } });

    if (!mds[0]) return false;

    markdown.title && (mds[0].title = markdown.title);
    mds[0].content = markdown.content;
    mds[0].visibility = markdown.visibility || MarkdownVisibility.PRIVATE;
    mds[0].save();
    return true;
  }

  public async deleteMarkdown(identifier: string) {
    const md = await this.ctx.model.Markdown.findByPk(identifier, {
      include: [
        {
          association: 'collaborators',
          required: false,
          attributes: ['id'],
        },
      ],
    });

    //@ts-ignore
    if (md.userId !== this.ctx.user?.userId) {
      return false;
    }

    md?.destroy();
    return true;
  }

  public async getVisibleMarkdowns() {
    const findOptions: FindOptions = {
      where: {
        [Op.or]: [
          {
            visibility: 'public',
          },
        ],
      },
      include: [
        {
          association: 'collaborators',
          required: false,
          attributes: ['id', 'name', 'avatarUrl'],
        },
        { model: this.ctx.model.User, attributes: ['id', 'name', 'avatarUrl'] },
      ],
    };

    if (this.ctx.user?.userId) {
      //@ts-ignore
      findOptions.where[Op.or].push({ userId: this.ctx.user?.userModel.id });
    }

    const mds = await this.ctx.model.Markdown.findAll(findOptions);

    return mds;
  }

  public async getMarkdown(identifier: string) {
    return await this.ctx.model.Markdown.findOne({ where: { id: identifier } });
  }
}
