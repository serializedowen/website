// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComment from '../../../app/model/comment';
import ExportLike from '../../../app/model/like';
import ExportThirdPartyUserRecords from '../../../app/model/third_party_user_records';
import ExportUser from '../../../app/model/user';
import ExportUserLoginRecord from '../../../app/model/user_login_record';
import ExportUserSecurityQuestion from '../../../app/model/user_security_question';
import ExportDtoUserDTO from '../../../app/model/dto/UserDTO';
import ExportDtoCommentDTO from '../../../app/model/dto/commentDTO';

declare module 'egg' {
  interface IModel {
    Comment: ReturnType<typeof ExportComment>;
    Like: ReturnType<typeof ExportLike>;
    ThirdPartyUserRecords: ReturnType<typeof ExportThirdPartyUserRecords>;
    User: ReturnType<typeof ExportUser>;
    UserLoginRecord: ReturnType<typeof ExportUserLoginRecord>;
    UserSecurityQuestion: ReturnType<typeof ExportUserSecurityQuestion>;
    Dto: {
      UserDTO: ReturnType<typeof ExportDtoUserDTO>;
      CommentDTO: ReturnType<typeof ExportDtoCommentDTO>;
    }
  }
}
