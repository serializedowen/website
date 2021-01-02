import { Service } from 'egg';

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

  public async getMarkdown(identifier: string) {
    return await this.ctx.model.Markdown.findOne({ where: { id: identifier } });
  }
}
