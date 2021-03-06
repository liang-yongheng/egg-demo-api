
// 控制器里的请求方式
export const CONTROLLER_METHOD_METADATA = Symbol('Controller#Method');
// 控制器里的调用函数
export const CONTROLLER_FUNC_METADATA = Symbol('Controller#Func');
// 控制器里的路由
export const CONTROLLER_ROUTE_METADATA = Symbol('Controller#Route');
// 控制器路由前缀
export const CONTROLLER_PRIFIX_METADATA = Symbol('Controller#Prefix');
// 控制器函数返回的数据格式
export const CONTROLLER_RETURN_TYPE_METADATA = Symbol('Controller#ReturnType');
// 路由正则校准
export const URL_CORRECT_REG = /^(\s|\/)+|(\s|\/)+$/g;
