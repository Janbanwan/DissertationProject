const teaching = require("express").Router();
const db = require("../../db");

const identifier = "teaching";
const pk = "teaching_id";

teaching.get(`/${identifier}`, (request, result, next) => {
  db.query(`SELECT * FROM ${identifier}`, (err, res) => {
    if (err) {
      return next(err);
    }
    result.send(res.rows);
  });
});

teaching.get(`/${identifier}/:id`, (request, result, next) => {
  db.query(
    `SELECT * FROM ${identifier} where ${pk} = $1`,
    [request.params.id],
    (err, res) => {
      if (err) {
        return next(err);
      }
      result.send(res.rows);
    }
  );
});

teaching.post(`/${identifier}`, (request, result, next) => {
  let keys = "";
  let values = "";

  for (let [key, value] of Object.entries(request.body)) {
    keys = keys + `${key},`;
    values = values + `'${value}',`;
  }

  keys = keys.substring(0, keys.length - 1);
  values = values.substring(0, values.length - 1);

  const queryString = `INSERT INTO ${identifier} (${keys}) values (${values})`;

  console.log(queryString);

  db.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
    }
    result.send("Ok");
  });
});

teaching.delete(`/${identifier}/:id`, (request, result, next) => {
  const queryString = `DELETE FROM ${identifier} WHERE ${pk} = $1`;

  db.query(queryString, [request.params.id], (err, res) => {
    if (err) {
      return next(err);
    }
    result.send(res.rows);
  });
});

teaching.put(`/${identifier}/:id`, (request, result, next) => {
  let qparams = "";

  for (let [key, value] of Object.entries(request.body)) {
    qparams = qparams + `${key} = '${value}',`;
  }

  qparams = qparams.substring(0, qparams.length - 1);

  const queryString = `UPDATE ${identifier} SET ${qparams} WHERE ${pk} = $1`;

  db.query(queryString, [request.params.id], (err, res) => {
    if (err) {
      return next(err);
    }
    result.send("ok");
  });
});

module.exports = teaching;
