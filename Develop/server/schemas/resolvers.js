const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context ) => {
        return User.findOne({ 
          $or: [{ _id: context.user ? context.user._id : null }, { username: context.user.username }],
           }).select('-password')
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    
    login: async (parent, { username, email, password }) => {
        const user = await User.findOne({ $or: [{ username }, { email }] });

        if (!user) {
            throw AuthenticationError;
          }

        const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
        const token = signToken(user);
        return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        {_id: context.user._id},
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
        )        
        return updatedUser;
    },
    removeBook: async (parent, { bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      )
      return updatedUser;
    }
  }
}

module.exports = resolvers;