const db = require("../../db");

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

function buildDeleteQueryString(identifier, argsid) {
  return `DELETE FROM ${identifier} WHERE ${identifier}_id = ${argsid} returning ${identifier}_id as id`;
}

async function addEntry(input, identifier) {
  return await db.query(buildAddQueryString(input, identifier)).then(res => {
    return res.rowCount >= 1
      ? `Created ${identifier} with ID ${res.rows[0].id}`
      : `Could not create a new ${identifier} with ${queryString}`;
  });
}

async function updateEntry(request, identifier, argsid) {
  return await db
    .query(buildUpdateQueryString(args.input, identifier, args.id))
    .then(res => {
      return res.rowCount >= 1
        ? `Updated ${identifier} with ID ${res.rows[0].id}`
        : `No ${identifier} with ID ${args.id}`;
    })
    .catch(err => {
      console.log(err);
    });
}

async function deleteEntry(identifier, argsid) {
  return await db
    .query(buildDeleteQueryString(identifier, args.id))
    .then(res => {
      return res.rowCount >= 1
        ? `Removed ${identifier} with ID ${res.rows[0].id}`
        : `No ${identifier} with ID ${args.id}`;
    })
    .catch(err => {
      console.log(err);
    });
}

async function getAllEntries(identifier, args) {
  const queryString =
    args.search === undefined
      ? `select * from ${identifier}`
      : `select * from ${identifier} where ${identifier}_id = ${args.search}`;
  return await db.query(queryString).then(res => {
    return res.rows;
  });
}

async function getChildEntries(parent, child = "university") {
  const queryString = `select * from ${child} where university_id = ${parent.university_id}`;

  return await db.query(queryString).then(res => {
    return res.rows[0];
  });
}

module.exports = {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries
};
