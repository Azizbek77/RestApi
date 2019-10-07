const env = require('./env.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    },

    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: 'Asia/Tashkent',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.UserDetail = require('../model/history.model.js')(sequelize, Sequelize);
db.Users = require('../model/users.model.js')(sequelize, Sequelize);

module.exports = db;
