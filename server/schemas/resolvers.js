const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    mainUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw new AuthenticationError("User Not Logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create({ args });
      const token = signToken(user);
      return { token, profile };
    },
  },
};
