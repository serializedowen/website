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
    this.ctx.body = await this.service.commentService.getComments(identifier);
  }

  @Post('/add')
  @Authenticated()
  public async addMarkdown(@Body body: MarkdownDTO) {
    const md = await this.service.markdownService.addMarkdown(body.content);

    console.log(md.id);
  }

  @Authenticated()
  @Post('/:identifier')
  public async updateMarkdown(@Param('identifier') identifier: string) {
    console.log(identifier);
  }
}
