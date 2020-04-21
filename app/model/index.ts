import 'egg';
import * as sequelize from 'sequelize';
import BaseModel from '../kernel/baseModel';
// import { Model } from 'sequelize';

declare module 'egg' {
  interface IModel extends sequelize.Sequelize, PlainObject {}

  // extend app
  interface Application {
    adminModel: AdminModel;
  }

  // extend context
  interface Context {
    adminModel: AdminModel;
  }

  // admin库的表定义
  interface AdminModel extends IModel {
    System: typeof BaseModel;
    User: typeof BaseModel;
  }

}
