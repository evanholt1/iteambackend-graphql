const { gql } = require('apollo-server-express');

module.exports = gql`
scalar URL

extend type Query {
  notebook: Notebook
  course(id:ID!): Course
  courses: [Course]
}

extend type Mutation {
  insertCourse(courseInput: CourseInsertionInput!): Course!
  editCourse(courseInput:CourseEditInput!): Course!
  deleteCourse(id:ID!): Course!
}

type Course {
  _id: ID!
  title: String!
  description: String!
  #videos: [Video]
  #softwares: [Software]
  #testbanks: [Testbank]
  #exams: [Exam]
  notebooks: [Notebook!]!
}

input CourseInsertionInput {
  title: String!
  description: String!
  #videos: [Video]
  #softwares: [Software]
  #testbanks: [Testbank]
  #exams: [Exam]
  notebooks: [CourseNotebookInput]
}

input CourseEditInput {
  _id: ID!
  title: String
  description: String
  #videos: [Video]
  #softwares: [Software]
  #testbanks: [Testbank]
  #exams: [Exam]
  notebooks: [CourseNotebookInput!]
}
`