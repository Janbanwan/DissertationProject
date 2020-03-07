const { Pool, Client } = require("pg");
const config = require("../config");

const pool = new Pool({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
