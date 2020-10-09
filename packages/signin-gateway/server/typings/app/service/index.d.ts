// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/Auth';
import ExportCommentService from '../../../app/service/CommentService';
import ExportTest from '../../../app/service/Test';
import ExportJwt from '../../../app/service/jwt';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    commentService: AutoInstanceType<typeof ExportCommentService>;
    test: AutoInstanceType<typeof ExportTest>;
    jwt: AutoInstanceType<typeof ExportJwt>;
  }
}
