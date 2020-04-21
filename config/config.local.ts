import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    datasources: [
      {
        dialect: 'mysql',
        database: 'v_admin',
        delegate: 'adminModel',
        baseDir: 'model/admin',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        timezone: '+08:00'
      },
    ]
  };

  config.redis = {
    clients: {
      master: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 0
      },
      session: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 0
      }
    }
  };

  return config;
};
