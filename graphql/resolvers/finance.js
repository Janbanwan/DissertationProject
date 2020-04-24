const db = require("../db");
const {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries,
} = require("./utils/utils");

/**
 * Identifier identifies the category, used with the database functions.
 *
 * Resolver for the schema.
 * All functionality happens in the utils file
 */
const identifier = "finances";

const queries = {
  nested: {
    university: async (finance) => await getChildEntries(finance),
  },
  getFinances: async (root, args) => await getAllEntries(identifier, args),
};

const mutations = {
  addFinances: async (root, { input }) => await addEntry(input, identifier),
  updateFinances: async (root, args) =>
    await updateEntry(args.input, identifier, args.id),
  removeFinances: async (root, args) => await deleteEntry(identifier, args.id),
};

module.exports = {
  queries,
  mutations,
};
