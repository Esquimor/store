import { makeExecutableSchema } from '@graphql-tools/schema'
const { createServer } = require('@graphql-yoga/node')

const typeDefs = require('./type')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = createServer({
  schema
});

module.exports = server