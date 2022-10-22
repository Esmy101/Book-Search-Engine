const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, { user_id }) => {
      return await User.find({ _id: user_id });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const found_user = User.findOne({ username: username });

      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, password }) => {},
    saveBook: async (
      parent,
      { authors, description, title, book_id, link }
    ) => {},
    removeBook: async (parent, { book_id }) => {},
  },
};

module.exports = resolvers;
