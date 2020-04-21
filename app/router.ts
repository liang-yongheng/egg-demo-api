import { Application } from 'egg';
import { RequestMapping } from './lib/egg-request-mapping';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  const requestMapping = new RequestMapping(app);
  requestMapping.scanController('api');
  requestMapping.scanController('open');
};
