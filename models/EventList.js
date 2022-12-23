const Sequelize = require("sequelize");

module.exports = class EventList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Date: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        EventId: {
          type: Sequelize.STRING(50),
          primaryKey: true,
          allowNull: false,
        },
        Title: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        EventTime: {
          type: Sequelize.STRING(500),
        },
        Image: {
          type: Sequelize.JSON,
        },
        Proceed: {
          type: Sequelize.STRING(10),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "EventList",
        tableName: "EventList",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
