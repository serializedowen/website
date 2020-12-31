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

  public async getMarkdown(identifier: string) {
    await this.ctx.model.Markdown.findOne({ where: { id: identifier } });
  }
}
