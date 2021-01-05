// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/Auth';
import ExportAvatarService from '../../../app/service/AvatarService';
import ExportCommentService from '../../../app/service/CommentService';
import ExportEmailService from '../../../app/service/EmailService';
import ExportMarkdownService from '../../../app/service/MarkdownService';
import ExportTest from '../../../app/service/Test';
import ExportJwt from '../../../app/service/jwt';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    avatarService: AutoInstanceType<typeof ExportAvatarService>;
    commentService: AutoInstanceType<typeof ExportCommentService>;
    emailService: AutoInstanceType<typeof ExportEmailService>;
    markdownService: AutoInstanceType<typeof ExportMarkdownService>;
    test: AutoInstanceType<typeof ExportTest>;
    jwt: AutoInstanceType<typeof ExportJwt>;
  }
}
