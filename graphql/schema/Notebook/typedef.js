const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
  courseNotebook(courseId:ID!,id:ID!): Notebook
  courseNotebooks(courseId:ID!): [Notebook!]!
}

extend type Mutation {
  addCourseNotebooks(courseId:ID!,notebookInsertionInputs:[NotebookInsertionInput!]!): [Notebook!]!
  editCourseNotebooks(courseId:ID!,notebookEditInputs:[NotebookEditInput!]!): [Notebook!]!
  deleteCourseNotebooks(courseId:ID!,ids:[ID!]!): [Notebook!]!
}

type Notebook {
  _id: ID!
  title: String
  description: String
  url: URL
  image: String
}

input CourseNotebookInput {
  _id: ID!
  title: String
  description: String
  url: URL
  image: String
}

input NotebookInsertionInput {
  title: String!
  description: String!
  url: URL!
  image: String
}

input NotebookEditInput {
  _id: ID!
  title: String
  description: String
  url: URL
  image: String
}
`