const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
  book: Book
}
type Book {
  title:String
}
`