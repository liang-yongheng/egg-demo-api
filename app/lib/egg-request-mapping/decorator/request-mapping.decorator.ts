
import { HttpMethodEnum } from '../enum/http-method.enum';
import { DataTypeEnum } from '../enum/data-type.enum';
import {
  CONTROLLER_METHOD_METADATA,
  CONTROLLER_ROUTE_METADATA,
  CONTROLLER_FUNC_METADATA,
  CONTROLLER_RETURN_TYPE_METADATA
} from '../constant';
// import { ReflectDefaultMetadata } from '../enum/reflect-default-metadata.enum';

export const RequestMapping = (path = '', method = HttpMethodEnum.GET, returnType = DataTypeEnum.JSON) => {
  // return (target, property, descriptor) => {
  return (target, property) => {
    const funcs = Reflect.getMetadata(CONTROLLER_FUNC_METADATA, target) || [];
    funcs.push(property);
    // 设置调用控制器里的函数
    Reflect.defineMetadata(CONTROLLER_FUNC_METADATA, funcs, target);
    // 设置调用控制器里的方法(get,post,put...)
    Reflect.defineMetadata(CONTROLLER_METHOD_METADATA, method, target, property);
    // 设置控制器里的路由地址
    Reflect.defineMetadata(CONTROLLER_ROUTE_METADATA, path, target, property);
    // 设置控制器里方法返回的数据格式
    Reflect.defineMetadata(CONTROLLER_RETURN_TYPE_METADATA, returnType, target, property);
  };
};
