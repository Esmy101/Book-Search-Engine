const { Book, User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, { user_id }) => {
      return await User.find({ _id: user_id });
    },
  },
};

module.exports = resolvers;
