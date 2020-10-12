const {  gql } = require('apollo-server-express');

module.exports = gql`
scalar EmailAddress
scalar URL
scalar NonNegativeFloat

type Query {
  _empty:String
}
type Mutation {
  _empty:String
}
`