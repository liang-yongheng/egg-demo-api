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
      comment: "主键ID",
      field: "id"
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "账号",
      field: "username",
      unique: "uniq_username"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "密码",
      field: "password"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "用户名称",
      field: "name"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "用户邮箱",
      field: "email",
      unique: "uniq_email"
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "用户手机号",
      field: "phone"
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户地址",
      field: "address"
    },
    type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: "用户角色(0:超级管理员,1:管理员)",
      field: "type"
    },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "用户状态(0:正常,1:已禁用,2:已删除)",
      field: "status"
    },
    avatar: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: "用户头像",
      field: "avatar"
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
    tableName: "v_user",
    comment: "用户信息表",
    freezeTableName: false,
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: ["id"]
    }, {
      name: "uniq_email",
      unique: true,
      using: "BTREE",
      fields: ["email"]
    }, {
      name: "uniq_username",
      unique: true,
      using: "BTREE",
      fields: ["username"]
    }, {
      name: "idx_phone",
      unique: false,
      using: "BTREE",
      fields: ["phone"]
    }]
  };
  const VUserModel = app.adminModel.define("v_user_model", attributes, options);
  return VUserModel;
}
