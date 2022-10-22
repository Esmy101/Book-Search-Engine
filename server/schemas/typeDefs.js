const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    bookId: ID
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
    token: ID!
    user: User
  }

  input BookContent {
    authors: [String]!
    description: String!
    title: String!
    bookId: ID!
    link: String
    image: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookContent!): User
    removeBook(book_id: ID!): User
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;
