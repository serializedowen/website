import { Controller } from "egg";
import {
  Prefix,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from "egg-shell-decorators-plus";

import Authenticated from "app/decorators/Authenticated";
import { commentDTO } from "app/model/dto/commentDTO";
import OpenAPI from "app/decorators/OpenAPI";
import UseGuard from "app/decorators/guards/UseGuard";
import AdminAndSelfGuard from "app/decorators/guards/AdminAndSelfGuard";

@Prefix("/comments")
export default class CommentController extends Controller {
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

  @Authenticated()
  @Delete("/:identifier/:commentId/delete")
  public async deleteComment(
    @Param("identifier") identifier: string,
    @Param("commentId") commentId: string
  ) {
    await this.service.commentService.deleteComment(commentId);
  }

  @Post("/:identifier/:commentId/like")
  @Authenticated()
  public async likeComment(
    @Param("identifier") identifier: string,
    @Param("commentId") commentId: string
  ) {
    this.service.commentService.likeComment(commentId, identifier);
  }
}
