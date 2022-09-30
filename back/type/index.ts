import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
const path = require('path')

const typesArray = loadFilesSync(path.join(__dirname, '.'), { extensions: ['gql'] })

const types = mergeTypeDefs(typesArray)

module.exports = types;