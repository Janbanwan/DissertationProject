const db = require("../db");
const {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries
} = require("./utils/utils");

const identifier = "internationality";

const queries = {
  nested: {
    university: async internationality =>
      await getChildEntries(internationality)
  },
  getInternationality: async (root, args) =>
    await getAllEntries(identifier, args)
};

const mutations = {
  addInternationality: async (root, { input }) =>
    await addEntry(input, identifier),
  updateInternationality: async (root, args) =>
    await updateEntry(args.input, identifier, args.id),
  removeInternationality: async (root, args) =>
    await deleteEntry(identifier, args.id)
};

module.exports = {
  queries,
  mutations
};
