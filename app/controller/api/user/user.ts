import BaseController from '../../../kernel/baseController';
import { Control, Post, Delete } from '../../../lib/egg-request-mapping/decorator/method-mapping.decorator';
import { HttpMethodEnum } from '../../../lib/egg-request-mapping/enum/http-method.enum';
import { RequestMapping } from '../../../lib/egg-request-mapping/decorator/request-mapping.decorator';

@Control('/api/user/')
export default class UserController extends BaseController {

  @Post('/signin/')
  public async signin () {
    const {
      username,
    } = this.ctx.request.body;
    const user = await this.ctx.adminModel.User.findOne({ where: { username } }) as object;
    return user;
  }

  @RequestMapping('signup', HttpMethodEnum.POST)
  public async signup (username: string, password: string) {
    username;
    password;
    return { a: 1 };
  }

  @Delete('signout')
  public async signout () {
    return {};
  }
}
