const { gql } = require('apollo-server-express');

module.exports = gql`
scalar URL

extend type Query {
  courseNotebook(courseId:ID!,id:ID!): Notebook
  courseNotebooks(courseId:ID!): [Notebook!]!
}

extend type Mutation {
  addCourseNotebook(courseId:ID!,notebookInsertionInput:NotebookInsertionInput!): Notebook!
  editCourseNotebook(courseId:ID!,notebookEditInput:NotebookEditInput!): Notebook!
  deleteCourseNotebook(courseId:ID!,id:ID!): Notebook!
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