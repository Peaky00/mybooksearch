const { gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs'); // Import your GraphQL typeDefs
const resolvers = require('./resolvers'); // Import your GraphQL resolvers

module.exports = {
  typeDefs,
  resolvers,
};