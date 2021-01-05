// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthController from '../../../app/controller/AuthController';
import ExportCommentController from '../../../app/controller/CommentController';
import ExportHomeController from '../../../app/controller/HomeController';
import ExportImageController from '../../../app/controller/ImageController';
import ExportMarkdownController from '../../../app/controller/MarkdownController';

declare module 'egg' {
  interface IController {
    authController: ExportAuthController;
    commentController: ExportCommentController;
    homeController: ExportHomeController;
    imageController: ExportImageController;
    markdownController: ExportMarkdownController;
  }
}
