const routes = require("express").Router();
const university = require("./categories/university");
const finances = require("./categories/finances");
const teaching = require("./categories/teaching");
const internationality = require("./categories/internationality");
const research = require("./categories/research");

routes.use(university, finances, teaching, internationality, research);

module.exports = routes;
