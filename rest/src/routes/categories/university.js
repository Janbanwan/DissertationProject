const university = require("express").Router();
const db = require("../../db");
const {
  getCategoryAll,
  getCategoryId,
  postCategory,
  updateCategory,
  deleteCategory
} = require("./utils/utils");

const identifier = "university";
const pk = "university_id";

university.get(`/${identifier}`, async (request, result, next) => {
  result.send(await getCategoryAll(identifier, request, true));
});

university.get(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await getCategoryId(identifier, request, pk));
});

university.post(`/${identifier}`, async (request, result, next) => {
  result.send(await postCategory(identifier, request));
});

university.delete(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await deleteCategory(identifier, request, pk));
});

university.put(`/${identifier}/:id`, async (request, result, next) => {
  result.send(await updateCategory(identifier, request, pk));
});

university.get(`/${identifier}`, (request, result, next) => {
  db.query(`SELECT * FROM ${identifier}`, (err, res) => {
    if (err) {
      return next(err);
    }
    result.send(res.rows);
  });
});

module.exports = university;
