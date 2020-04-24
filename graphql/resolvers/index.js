const db = require("../db");
const University = require("./university");
const Teaching = require("./teaching");
const Research = require("./research");
const Internationality = require("./internationality");
const Finance = require("./finance");

/**
 * Contains all the resolvers from different categories
 * This is imported to the server for creation
 */

module.exports = {
  Query: {
    getUniversities: University.queries.getUniversities,
    getTeaching: Teaching.queries.getTeaching,
    getFinances: Finance.queries.getFinances,
    getInternationality: Internationality.queries.getInternationality,
    getResearch: Research.queries.getResearch,
  },
  Mutation: {
    addUniversity: University.mutations.addUniversity,
    updateUniversity: University.mutations.updateUniversity,
    removeUniversity: University.mutations.removeUniversity,
    addInternationality: Internationality.mutations.addInternationality,
    updateInternationality: Internationality.mutations.updateInternationality,
    removeInternationality: Internationality.mutations.removeInternationality,
    addTeaching: Teaching.mutations.addTeaching,
    updateTeaching: Teaching.mutations.updateTeaching,
    removeTeaching: Teaching.mutations.removeTeaching,
    addResearch: Research.mutations.addResearch,
    updateResearch: Research.mutations.updateResearch,
    removeResearch: Research.mutations.removeResearch,
    addFinances: Finance.mutations.addFinances,
    updateFinances: Finance.mutations.updateFinances,
    removeFinances: Finance.mutations.removeFinances,
  },
  University: University.queries.nested,
  Teaching: Teaching.queries.nested,
  Research: Research.queries.nested,
  Internationality: Internationality.queries.nested,
  Finance: Finance.queries.nested,
};
