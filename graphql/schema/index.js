const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  _id: ID!
  name: String!
  email: String!
  password: String!
  resetPasswordToken: String
  resetPasswordExpire: String
  createdAt: String
}

input UserInput {
  name: String!
  email: String!
  password: String!
  confirmPassword: String!
}

type AuthData {
    userId: String!
    token: String!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
    forgotPassword(email: String!): String!
    viewProfile: User
  }
  type RootMutation {
    createUser(userInput: UserInput): User
    updateUser(name: String!, email: String!): User
    updatePassword(password: String!, confirmPassword: String!, token: String!): String!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
