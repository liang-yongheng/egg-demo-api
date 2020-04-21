import { EggPlugin } from 'egg';
import * as path from 'path';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  redis: {
    enable: true,
    package: 'egg-redis-ts'
  },
  // // 路由装饰器
  // requestMapping: {
  //   enable: true,
  //   path: path.join(__dirname, '../app/lib/egg-request-mapping'),
  // },
  // sessionRedis: {
  //   enable: true,
  //   package: 'egg-session-redis',
  // },
};

export default plugin;
