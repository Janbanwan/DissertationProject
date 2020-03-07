const db = require("../db");
const {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries
} = require("./utils/utils");

const identifier = "research";

const queries = {
  nested: {
    university: async research => await getChildEntries(research)
  },
  getResearch: async (root, args) => await getAllEntries(identifier, args)
};

const mutations = {
  addResearch: async (root, { input }) => await addEntry(input, identifier),
  updateResearch: async (root, args) =>
    await updateEntry(args.input, identifier, args.id),
  removeResearch: async (root, args) => await deleteEntry(identifier)
};

module.exports = {
  queries,
  mutations
};
