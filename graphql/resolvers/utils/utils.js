const db = require("../../db");

/**
 *
 * @param {Request body containing the parameters to create the query string} request
 * @param {Identifies the category operated on} identifier
 * @param {Identifier for the object that is updated} argsid
 */
function buildUpdateQueryString(request, identifier, argsid) {
  let qparams = "";

  if (request) {
    for (let [key, value] of Object.entries(request)) {
      qparams = qparams + `${key} = '${value}',`;
    }
  }

  qparams = qparams.substring(0, qparams.length - 1);

  if (!identifier || !argsid) {
    throw new Error(
      `Cannot create new Query string with parameters ${request}, ${identifier}, ${argsid}`
    );
  }

  return `UPDATE ${identifier} SET ${qparams} WHERE ${identifier}_id = ${argsid} returning ${identifier}_id as id`;
}

/**
 *
 * @param {Request body containing parameters to create query string} request
 * @param {Identifies the category operated on} identifier
 */
function buildAddQueryString(request, identifier) {
  let keys = "";
  let values = "";
  for (let [key, value] of Object.entries(request)) {
    keys = keys + `${key},`;
    values = values + `'${value}',`;
  }

  keys = keys.substring(0, keys.length - 1);
  values = values.substring(0, values.length - 1);

  return `INSERT INTO ${identifier} (${keys}) values (${values}) returning ${identifier}_id as id`;
}

/**
 *
 * @param {Identifies the category operated on} identifier
 * @param {Identifier for the object that is deleted} argsid
 */
function buildDeleteQueryString(identifier, argsid) {
  return `DELETE FROM ${identifier} WHERE ${identifier}_id = ${argsid} returning ${identifier}_id as id`;
}

/**
 *
 * @param {Input contains the object details used for creation} input
 * @param {Identifies the category operated on} identifier
 */
async function addEntry(input, identifier) {
  return await db.query(buildAddQueryString(input, identifier)).then((res) => {
    return res.rowCount >= 1
      ? `Created ${identifier} with ID ${res.rows[0].id}`
      : `Could not create a new ${identifier} with ${queryString}`;
  });
}

/**
 *
 * @param {Request body containing parameters used to update entry} request
 * @param {Identifies the category operated on} identifier
 * @param {Identifies the object to be updated} argsid
 */
async function updateEntry(request, identifier, argsid) {
  return await db
    .query(buildUpdateQueryString(args.input, identifier, args.id))
    .then((res) => {
      return res.rowCount >= 1
        ? `Updated ${identifier} with ID ${res.rows[0].id}`
        : `No ${identifier} with ID ${args.id}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 *
 * @param {Identifies the category operated on} identifier
 * @param {Identifies the object to be deleted} argsid
 */
async function deleteEntry(identifier, argsid) {
  return await db
    .query(buildDeleteQueryString(identifier, args.id))
    .then((res) => {
      return res.rowCount >= 1
        ? `Removed ${identifier} with ID ${res.rows[0].id}`
        : `No ${identifier} with ID ${args.id}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 *
 * @param {Identifies the category operated on} identifier
 * @param {Contains serach parameters if used in query} args
 */
function getAllQueryString(identifier, args) {
  if (args && args.search && args.year) {
    return `select * from ${identifier} where ${identifier}_id = ${args.search} and year = ${args.year}`;
  } else if (args && args.search) {
    return `select * from ${identifier} where ${identifier}_id = ${args.search}`;
  } else if (args && args.year) {
    return `select * from ${identifier} where year = ${args.year}`;
  }

  return `select * from ${identifier}`;
}

/**
 *
 * @param {Identifies category operated on} identifier
 * @param {Contains search arguments if presesnt in query} args
 */
async function getAllEntries(identifier, args) {
  const queryString = getAllQueryString(identifier, args);
  return await db.query(queryString).then((res) => {
    return res.rows;
  });
}

/**
 *
 * @param {Parent object from the query executed, used to retrieve right object based on ID} parent
 * @param {Category being queried} child
 */
async function getChildEntries(parent, child = "university") {
  const queryString = `select * from ${child} where university_id = ${parent.university_id}`;

  return await db.query(queryString).then((res) => {
    return res.rows[0];
  });
}

module.exports = {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries,
};
