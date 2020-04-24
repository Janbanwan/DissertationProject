const finances = require("express").Router();
const db = require("../../db");
const {
  getCategoryAll,
  getCategoryId,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("./utils/utils");

const identifier = "finances";
const pk = "finances_id";

finances.get(`/${identifier}`, async (request, result, next) => {
  result.send(await getCategoryAll(identifier, request));
});

finances.get(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await getCategoryId(identifier, request, pk));
});

finances.post(`/${identifier}`, async (request, result, next) => {
  result.send(await postCategory(identifier, request));
});

finances.delete(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await deleteCategory(identifier, request, pk));
});

finances.put(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await updateCategory(identifier, request, pk));
});
module.exports = finances;
