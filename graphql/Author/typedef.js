const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
  author: Author
}
type Author {
  name:String
}
`