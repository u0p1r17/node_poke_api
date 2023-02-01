'use strict';
// module.exports = (env) => {
//   if(env==="production"){
//     // Node env -> production
//     return {
//       "username": "root",
//       "password": null,
//       "database": "database_production",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     }
//   } else {
//     // Node env -> development
//     return {
//       "database": "pokedex",
//       "username": "root",
//       "password": null,
//       "host": "localhost",
//       "port":"3333",
//       "logging": true,
//       "dialect": "mariadb",
//       "dialectOPtions": {
//         "timezone": "Etc/GMT-2"
//       }
//     }
//   }
// }

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
