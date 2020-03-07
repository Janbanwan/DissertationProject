const db = require("../db");
const {
  addEntry,
  updateEntry,
  deleteEntry,
  getAllEntries,
  getChildEntries
} = require("./utils/utils");

const identifier = "teaching";

const queries = {
  nested: {
    university: async teaching => await getChildEntries(teaching)
  },
  getTeaching: async () => await getAllEntries(identifier)
};

const mutations = {
  addTeaching: async (root, { input }) => await addEntry(input, identifier),
  updateTeaching: async (root, args) =>
    await updateEntry(args.input, identifier, args.id),
  removeTeaching: async (root, args) => await deleteEntry(identifier, args.id)
};

module.exports = {
  queries,
  mutations
};
