const research = require("express").Router();
const db = require("../../db");
const {
  getCategoryAll,
  getCategoryId,
  postCategory,
  updateCategory,
  deleteCategory
} = require("./utils/utils");

const identifier = "research";
const pk = "research_id";

research.get(`/${identifier}`, async (request, result, next) => {
  result.send(await getCategoryAll(identifier, request));
});

research.get(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await getCategoryId(identifier, request, pk));
});

research.post(`/${identifier}`, async (request, result, next) => {
  result.send(await postCategory(identifier, request));
});

research.delete(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await deleteCategory(identifier, request, pk));
});

research.put(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await updateCategory(identifier, request, pk));
});

module.exports = research;
