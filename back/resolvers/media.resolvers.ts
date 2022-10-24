import { GraphQLError } from "graphql"
const fs = require("fs/promises");
const path = require("path");

export default  {
  Mutation: {
    async saveFile(_, { file }) {
      try {
        await fs.writeFile(path.join(__dirname, "file.png"), file, 'base64')
        return true
      } catch {
        return false
      }
    }
  }
}