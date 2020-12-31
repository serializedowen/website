// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBookmarks from '../../../app/model/bookmarks';
import ExportComment from '../../../app/model/comment';
import ExportLike from '../../../app/model/like';
import ExportMarkdown from '../../../app/model/markdown';
import ExportThirdPartyUserRecords from '../../../app/model/third_party_user_records';
import ExportUser from '../../../app/model/user';
import ExportUserLoginRecord from '../../../app/model/user_login_record';
import ExportUserSecurityQuestion from '../../../app/model/user_security_question';
import ExportDtoCreateUserDTO from '../../../app/model/dto/CreateUserDTO';
import ExportDtoMarkdownDTO from '../../../app/model/dto/MarkdownDTO';
import ExportDtoUserDTO from '../../../app/model/dto/UserDTO';
import ExportDtoCommentDTO from '../../../app/model/dto/commentDTO';

declare module 'egg' {
  interface IModel {
    Bookmarks: ReturnType<typeof ExportBookmarks>;
    Comment: ReturnType<typeof ExportComment>;
    Like: ReturnType<typeof ExportLike>;
    Markdown: ReturnType<typeof ExportMarkdown>;
    ThirdPartyUserRecords: ReturnType<typeof ExportThirdPartyUserRecords>;
    User: ReturnType<typeof ExportUser>;
    UserLoginRecord: ReturnType<typeof ExportUserLoginRecord>;
    UserSecurityQuestion: ReturnType<typeof ExportUserSecurityQuestion>;
    Dto: {
      CreateUserDTO: ReturnType<typeof ExportDtoCreateUserDTO>;
      MarkdownDTO: ReturnType<typeof ExportDtoMarkdownDTO>;
      UserDTO: ReturnType<typeof ExportDtoUserDTO>;
      CommentDTO: ReturnType<typeof ExportDtoCommentDTO>;
    }
  }
}
