// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCaptureRedirect from '../../../app/middleware/captureRedirect';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportInjectUserdata from '../../../app/middleware/injectUserdata';

declare module 'egg' {
  interface IMiddleware {
    captureRedirect: typeof ExportCaptureRedirect;
    errorHandler: typeof ExportErrorHandler;
    injectUserdata: typeof ExportInjectUserdata;
  }
}
