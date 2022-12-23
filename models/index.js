const Sequelize = require("sequelize");
const User = require("./user");
const MenuList = require("./menuList");
const EventList = require("./EventList");
const Notice = require("./notice");
const AdminAuth = require("./adminAuth");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.MenuList = MenuList;
db.EventList = EventList;
db.Notice = Notice;
db.AdminAuth = AdminAuth;

User.init(sequelize);
MenuList.init(sequelize);
EventList.init(sequelize);
Notice.init(sequelize);
AdminAuth.init(sequelize);

module.exports = db;
