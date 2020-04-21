import { Model, BuildOptions } from 'sequelize';
export interface IVUserAttributes {
  id: number,
  username: string,
  password: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  type: number,
  status: number,
  avatar: string,
  created_at: Date,
  updated_at: Date,
}
export interface IVUserModel extends IVUserAttributes, Model {}
export type IVUserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IVUserModel;
};
