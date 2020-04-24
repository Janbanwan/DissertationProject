const db = require("../../../db");
/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing the year object if specified in the query} request
 * @param {Used to skip querying the database for a year in the case the identifier is university } skip
 */
async function getCategoryAll(identifier, request, skip = false) {
  return await db
    .query(getQueryWithString(identifier, request, skip))
    .then((res) => {
      return res.rows;
    });
}

/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing data about the to be created object} request
 */
async function postCategory(identifier, request) {
  return await db
    .query(getPostQueryString(identifier, request))
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return `Could not create ${identifier} with ${getPostQueryString(
        identifier,
        request
      )}`;
    });
}

/**
 *
 * @param {Identifies the category for which the operation is done}} identifier
 * @param {Request body containing data about the to be created object} request
 * @param {Primary key of the category} pk
 */

async function updateCategory(identifier, request, pk) {
  return await db
    .query(getUpdateQueryString(identifier, request, pk))
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return `Could not create ${identifier} with ${getUpdateQueryString(
        identifier,
        request,
        pk
      )}`;
    });
}

/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing the ID of the object to be deleted} request
 * @param {Primary key of the category} pk
 */
async function deleteCategory(identifier, request, pk) {
  const qs = `DELETE FROM ${identifier} WHERE ${pk} = ${request.params.id} returning ${identifier}_id as id`;

  return await db
    .query(qs)
    .then((res) => {
      if (res.rows.length >= 1) {
        return res.rows;
      }
      return `Could not delete ${request.params.id} from ${identifier}`;
    })
    .catch((err) => {
      return `Could not delete ${request.params.id} from ${identifier}`;
    });
}
/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing the ID of the object to be retrieved} request
 * @param {Primary key of the category} pk
 */
async function getCategoryId(identifier, request, pk) {
  return await db
    .query(`SELECT * FROM ${identifier} where ${pk} = ${request.params.id}`)
    .then((res) => {
      return res.rows;
    });
}
/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing query parameter year if present} request
 * @param {used to skip execution of if statement if identifier is university} skip
 */
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

/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing object to be created} request
 */

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

/**
 *
 * @param {Identifies the category for which the operation is done} identifier
 * @param {Request body containing the ID of the object to updated} request
 * @param {Primary key of the category} pk
 */
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
  deleteCategory,
};
