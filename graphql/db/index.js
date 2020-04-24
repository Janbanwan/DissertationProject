const { Pool } = require("pg");
const config = require("../config");

/**
 * The pool object represents a connection to the database.
 *
 * The connection is exported to the application from which the application queries the database
 */

const pool = new Pool({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
