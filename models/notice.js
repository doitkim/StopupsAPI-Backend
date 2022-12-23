const Sequelize = require("sequelize");

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Date: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        Title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        Desc: {
          type: Sequelize.STRING(400),
          allowNull: false,
        },
        Id: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        Num: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Notice",
        tableName: "Notice",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
