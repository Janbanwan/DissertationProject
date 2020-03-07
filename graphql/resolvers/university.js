const db = require("../db");
const {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries
} = require("./utils/utils");

const identifier = "university";

const queries = {
  nested: {
    finance: async university => await getChildEntries(university, "finances"),
    teaching: async university => await getChildEntries(university, "teaching"),
    research: async university => await getChildEntries(university, "research"),
    internationality: async university =>
      await getChildEntries(university, "internationality")
  },
  getUniversities: async (root, args) => await getAllEntries(identifier, args)
};

const mutations = {
  addUniversity: async (root, { input }) => await addEntry(input, identifier),
  updateUniversity: async (root, args) =>
    await updateEntry(args.input, identifier, args.id),
  removeUniversity: async (root, args) => await deleteEntry(identifier)
};

module.exports = {
  queries,
  mutations
};
