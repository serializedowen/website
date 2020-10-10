import { Controller } from "egg";
import { Prefix, Get, Post, Body, Param } from "egg-shell-decorators-plus";

import Authenticated from "app/decorators/Authenticated";
import { commentDTO } from "app/model/dto/commentDTO";

@Prefix("/comments")
export default class CommentsController extends Controller {
  @Authenticated()
  @Get("/:identifier/add")
  public async addComment(
    @Body data: commentDTO,
    @Param("identifier") identifier: string
  ) {
    await this.service.commentService.addComment({ ...data, identifier });
  }
}
