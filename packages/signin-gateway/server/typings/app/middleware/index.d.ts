// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInjectUserdata from '../../../app/middleware/injectUserdata';

declare module 'egg' {
  interface IMiddleware {
    injectUserdata: typeof ExportInjectUserdata;
  }
}
