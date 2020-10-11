import { Controller } from "egg";
import { Prefix, Get, Post, Body, Param } from "egg-shell-decorators-plus";

import Authenticated from "app/decorators/Authenticated";
import { commentDTO } from "app/model/dto/commentDTO";
import OpenAPI from "app/decorators/OpenAPi";

@Prefix("/comments")
export default class CommentsController extends Controller {
  @Authenticated()
  @Post("/:identifier/add")
  public async addComment(
    @Body data: commentDTO,
    @Param("identifier") identifier: string
  ) {
    await this.service.commentService.addComment({ ...data, identifier });
  }

  @OpenAPI()
  @Get("/:identifier")
  public async getComments(@Param("identifier") identifier: string) {
    this.ctx.body = await this.service.commentService.getComments(identifier);
    this.ctx.status = 200;
  }
}
