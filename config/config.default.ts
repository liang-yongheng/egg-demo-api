import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584955887573_2709';

  // add your egg config in here
  config.middleware = ['errorHandle'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // 自定义启动端口
  config.cluster = {
    listen: {
      port: 9980,
      hostname: '0.0.0.0',
    }
  };

  config.security = {
    domainWhiteList: ['127.0.0.1'],
    csrf: {
      enable: true,
      // useSession: true, // 使用session
      headerName: 'x-csrf-token', // header里token参数
    }
  };

  config.session = {
    maxAge: 24 * 3600 * 1000, // ms
    key: 'V_SESSION',
    httpOnly: true,
    encrypt: true,
  };

  // config.sessionRedis = {
  //   name: 'session'
  // };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
