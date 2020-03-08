const db = require("../../../db");

async function getCategoryAll(identifier, request, skip = false) {
  return await db
    .query(getQueryWithString(identifier, request, skip))
    .then(res => {
      return res.rows;
    });
}

async function postCategory(identifier, request) {
  return await db
    .query(getPostQueryString(identifier, request))
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return `Could not create ${identifier} with ${getPostQueryString(
        identifier,
        request
      )}`;
    });
}

async function updateCategory(identifier, request, pk) {
  return await db
    .query(getUpdateQueryString(identifier, request, pk))
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return `Could not create ${identifier} with ${getUpdateQueryString(
        identifier,
        request,
        pk
      )}`;
    });
}

async function deleteCategory(identifier, request, pk) {
  const qs = `DELETE FROM ${identifier} WHERE ${pk} = ${request.params.id} returning ${identifier}_id as id`;

  return await db
    .query(qs)
    .then(res => {
      console.log(res);
      if (res.rows.length >= 1) {
        return res.rows;
      }
      return `Could not delete ${request.params.id} from ${identifier}`;
    })
    .catch(err => {
      console.log(err);
      console.log("asd");
      return `Could not delete ${request.params.id} from ${identifier}`;
    });
}

async function getCategoryId(identifier, request, pk) {
  return await db
    .query(`SELECT * FROM ${identifier} where ${pk} = ${request.params.id}`)
    .then(res => {
      return res.rows;
    });
}

function getQueryWithString(identifier, request, skip) {
  let qs = `SELECT * FROM ${identifier}`;
  if (
    request &&
    request.query &&
    Object.keys(request.query).length !== 0 &&
    skip === false
  ) {
    qs = `SELECT * FROM ${identifier} WHERE year = ${request.query.year}`;
  }

  return qs;
}

function getPostQueryString(identifier, request) {
  let keys = "";
  let values = "";

  for (let [key, value] of Object.entries(request.body)) {
    keys = keys + `${key},`;
    values = values + `'${value}',`;
  }

  keys = keys.substring(0, keys.length - 1);
  values = values.substring(0, values.length - 1);

  return `INSERT INTO ${identifier} (${keys}) values (${values}) returning ${identifier}_id as id`;
}

function getUpdateQueryString(identifier, request, pk) {
  let qparams = "";

  for (let [key, value] of Object.entries(request.body)) {
    qparams = qparams + `${key} = '${value}',`;
  }

  qparams = qparams.substring(0, qparams.length - 1);

  return `UPDATE ${identifier} SET ${qparams} WHERE ${pk} = ${request.params.id} returning ${identifier}_id as id`;
}

module.exports = {
  getCategoryAll,
  getCategoryId,
  postCategory,
  updateCategory,
  deleteCategory
};
