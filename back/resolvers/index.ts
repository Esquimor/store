import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
const path = require('path')

const resolversArray = loadFilesSync(path.join(__dirname, '*.resolvers.ts'))

module.exports = mergeResolvers(resolversArray)