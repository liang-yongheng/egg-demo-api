
import { Application, Context } from 'egg';
import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import { exploreController, RouteHandlerInterface } from './lib/loader';
import { URL_CORRECT_REG } from './constant';
// import { DataTypeEnum } from './enum/data-type.enum';

export interface RouteMetadataInterface {
  filePath: string; // 文件路径
  prefix: string;// 路由前缀
  url: string;// 完整路由
  handler: RouteHandlerInterface; // 路由handler
}

export class RequestMapping {
  private readonly app: Application;
  public _files: Set<string> = new Set();
  public _routes: Map<string, RouteMetadataInterface> = new Map();

  constructor (app: Application) {
    this.app = app;
  }

  remove (src: string, st: string) {
    const index = src.indexOf(st);
    if (index >= 0) {
      return src.substring(0, index);
    }
    return src;
  }

  /**
   * 读取路径下的文件
   * @param dir 路径
   */
  scanDir (dir: string) {
    const appDir = this.remove(__dirname, 'app');

    if (!path.isAbsolute(dir)) {
      dir = path.join(appDir, 'app/controller', dir);
    }

    if (!fs.existsSync(dir)) {
      throw new Error(`Can not find directory: ${dir}`);
    }

    const files = fs.readdirSync(dir);
    let result: string[] = [];
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        result = [...result, ...this.scanDir(filePath)];
      } else if (stat.isFile()) { // 是否为文件
        if (this.app.config.env !== 'local' && /.js/.test(filePath)) {
          result.push(filePath);
        } else if (this.app.config.env === 'local') {
          result.push(filePath);
        }
      }
    });
    return result;
  }

  scanController (dir = '', prefix = '/test/', middleware = []) {
    const files = this.scanDir(dir);
    files.forEach(file => {
      if (this._files.has(file)) return;
      this._files.add(file);
      let controller = require(file);
      // 兼容export default写法(支持module.exports)
      if (controller instanceof Function === false) {
        controller = controller.default;
      }
      const handlers: RouteHandlerInterface[] = exploreController(controller);
      handlers.forEach(handler => {
        let {
          funcName,
          httpMethod,
          urlPath,
          // dataType
        } = handler;
        prefix = prefix.replace(URL_CORRECT_REG, '');
        urlPath = urlPath.replace(URL_CORRECT_REG, '');
        const url = `/${prefix}/${urlPath}`;
        this.logRouter(file, prefix, url, handler);
        this.app.router[httpMethod](urlPath, ...middleware, async (ctx: Context) => {
          const instance = new controller(ctx);
          const result = await instance[funcName]();
          if (ctx.body === undefined) {
            ctx.body = this.handleDataType(result);
          }
        });
      });
    });
  }

  logRouter (file: string, prefix: string, url: string, handler: RouteHandlerInterface) {
    const {
      httpMethod,
      urlPath,
    } = handler;
    const routeKey = `${httpMethod}:${urlPath}`;
    assert(!this._routes.has(routeKey), `[route] ${routeKey} already exists! this is file at : ${file}`);
    this._routes.set(routeKey, {
      filePath: file,
      prefix,
      url,
      handler,
    });
  }

  handleDataType (data: any) {
    return data;
  }
}
