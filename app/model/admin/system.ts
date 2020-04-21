import { Application } from 'egg';
export default function (app: Application) {
  const {
    Sequelize,
    DataTypes
  } = app.Sequelize;
  const attributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id",
      field: "id"
    },
    key: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "配置key",
      field: "key",
      unique: "key"
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "配置值",
      field: "value"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: "创建时间",
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: "更新时间",
      field: "updated_at"
    }
  };
  const options = {
    tableName: "v_system",
    comment: "系统配置表",
    freezeTableName: false,
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: ["id"]
    }, {
      name: "key",
      unique: true,
      using: "BTREE",
      fields: ["key"]
    }]
  };
  const VSystemModel = app.adminModel.define("v_system_model", attributes, options);
  return VSystemModel;
}
