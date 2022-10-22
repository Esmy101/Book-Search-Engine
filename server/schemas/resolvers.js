const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("incorrect password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new AuthenticationError("Could not create account");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      console.log(context);

      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: book } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } catch (err) {
          throw new AuthenticationError("err");
        }
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },
    removeBook: async (parent, { book_id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: book_id } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new AuthenticationError("Could not find the user?");
        }
        return updatedUser;
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },
  },
};

module.exports = resolvers;
