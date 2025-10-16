require('dotenv').config();

module.exports = {
  "development": {
    "user": process.env.DB_USER || "allex",
    "password": process.env.DB_PASS || "1234",
    "database": process.env.DB_NAME || "database_development_resolveai",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql"
  },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
};
