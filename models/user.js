const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userToken: {
          type: Sequelize.STRING(400),
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.STRING(400),
          allowNull: false,
        },
        userPw: {
          type: Sequelize.STRING(400),
          allowNull: false,
        },
        userPhoneNumber: {
          type: Sequelize.STRING(400),
          allowNull: false,
        },
        userApiKey: {
          type: Sequelize.STRING(400),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
