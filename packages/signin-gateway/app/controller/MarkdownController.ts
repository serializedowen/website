import { Controller } from 'egg';
import { Prefix, Get, Post, Param, Body } from 'egg-shell-decorators-plus';
import Authenticated from 'app/decorators/Authenticated';
import OpenAPI from 'app/decorators/OpenAPI';

import { MarkdownDTO } from 'app/model/dto/MarkdownDTO';

@Prefix('/markdown')
export default class MarkdownController extends Controller {
  @OpenAPI()
  @Get('/:identifier')
  public async getMarkdown(@Param('identifier') identifier: string) {
    const model = await this.service.markdownService.getMarkdown(identifier);

    if (model) this.ctx.body = model;
    else this.ctx.status = 404;
  }

  @Post('/add')
  @Authenticated()
  public async addMarkdown(@Body body: MarkdownDTO) {
    const md = await this.service.markdownService.addMarkdown(body.content);
    this.ctx.body = md.id;
  }

  @Authenticated()
  @Post('/:identifier')
  public async updateMarkdown(
    @Param('identifier') identifier: string,
    @Body body: MarkdownDTO
  ) {
    const flag = this.service.markdownService.updateMarkdown(
      body.content,
      identifier
    );

    if (!flag) this.ctx.status = 500;
  }
}
