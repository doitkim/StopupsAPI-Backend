const Sequelize = require("sequelize");

module.exports = class MenuList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Category: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        ProductId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        Name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        Image: {
          type: Sequelize.STRING(400),
        },
        Desc: {
          type: Sequelize.STRING(400),
        },
        Nutrient: {
          type: Sequelize.JSON,
        },
        Price: {
          type: Sequelize.JSON,
        },
        DrinkType: {
          type: Sequelize.JSON,
        },
        EatType: {
          type: Sequelize.JSON,
        },
        CookType: {
          type: Sequelize.JSON,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "MenuList",
        tableName: "MenuList",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
