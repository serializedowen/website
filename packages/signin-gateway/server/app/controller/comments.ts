import { Controller } from "egg";
import {
  Prefix,
  Get,
  Post,
  Body,
  Query,
  Header,
} from "egg-shell-decorators-plus";
import { UserDTO } from "app/model/dto/UserDTO";
import Authenticated from "app/decorators/Authenticated";
import { commentDTO } from "app/model/dto/commentDTO";

@Prefix("/comments")
export default class CommentsController extends Controller {
  @Get("/:id")
  public async index() {}

  @Authenticated()
  @Get("/aaa/add")
  public async addComment(@Body data: commentDTO) {
    this.ctx.user;

    this.ctx.service.console.log(this.ctx.user);
  }
}
