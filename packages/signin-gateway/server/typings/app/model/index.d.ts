// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser from '../../../app/model/user';
import ExportUserLoginRecord from '../../../app/model/user_login_record';
import ExportUserSecurityQuestion from '../../../app/model/user_security_question';

declare module 'egg' {
  interface IModel {
    User: ReturnType<typeof ExportUser>;
    UserLoginRecord: ReturnType<typeof ExportUserLoginRecord>;
    UserSecurityQuestion: ReturnType<typeof ExportUserSecurityQuestion>;
  }
}
