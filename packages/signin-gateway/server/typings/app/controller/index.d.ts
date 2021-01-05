// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportComments from '../../../app/controller/comments';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    comments: ExportComments;
    home: ExportHome;
  }
}
