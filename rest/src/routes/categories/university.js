const university = require("express").Router();
const db = require("../../db");
const {
  getCategoryAll,
  getCategoryId,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("./utils/utils");

const identifier = "university";
const pk = "university_id";
/**
 * Identifier is used to identify the server when the functions in the util folder construct the different queries
 * PK signals primary key
 *
 * The different endpoints are initiated here.
 * The main functionality happens within the utils function
 */

university.get(`/${identifier}`, async (request, result) => {
  result.send(await getCategoryAll(identifier, request, true));
});

university.get(`/${identifier}/:id`, async (request, result) => {
  result.send(await getCategoryId(identifier, request, pk));
});

university.post(`/${identifier}`, async (request, result) => {
  result.send(await postCategory(identifier, request));
});

university.delete(`/${identifier}/:id`, async (request, result) => {
  result.send(await deleteCategory(identifier, request, pk));
});

university.put(`/${identifier}/:id`, async (request, result) => {
  result.send(await updateCategory(identifier, request, pk));
});

module.exports = university;
