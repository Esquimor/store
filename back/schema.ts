import { makeExecutableSchema } from '@graphql-tools/schema'
import { authGraphql } from "./middleware/auth"
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
  schema,
  context: async ({req}) => {
    const auth = await authGraphql(req);
    return auth
  }
});

module.exports = server