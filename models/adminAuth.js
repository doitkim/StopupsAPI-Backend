const Sequelize = require("sequelize");

module.exports = class AdminAuth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        adminToken: {
          type: Sequelize.STRING(400),
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "AdminAuth",
        tableName: "adminAuth",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
