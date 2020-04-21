import { Model, BuildOptions } from 'sequelize';
export interface IVSystemAttributes {
  id: number,
  key: string,
  value: string,
  created_at: Date,
  updated_at: Date,
}
export interface IVSystemModel extends IVSystemAttributes, Model {}
export type IVSystemModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IVSystemModel;
};
