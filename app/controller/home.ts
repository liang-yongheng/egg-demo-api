import BaseController from '../kernel/baseController';

export default class HomeController extends BaseController {

  public async index () {
    const { ctx } = this;
    let welcome = await this.app.redis.get('master').get('vince:welcome');
    if (!welcome) {
      const data = await ctx.adminModel.System.findOne({ where: { key: 'welcome' } });
      if (data) {
        welcome = data?.get('value') as string;
        await this.app.redis.get('master').set('vince:welcome', welcome, 'EX', 86400);
      }
    }
    let data = {};
    if (welcome) {
      data = JSON.parse(welcome);
    }
  }
}
