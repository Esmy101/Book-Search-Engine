const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    book_id: id
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID
    user_name: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
