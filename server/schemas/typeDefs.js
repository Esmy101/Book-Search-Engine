const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    book_id: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: String
    user: User
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String!, password: String!): Auth
    saveBook(
      authors: [String]!
      description: String!
      title: String!
      book_id: ID!
      link: String!
    ): User
    removeBook(book_id: ID!): User
  }

  type Query {
    me(user_id: ID!): User
  }
`;

module.exports = typeDefs;
