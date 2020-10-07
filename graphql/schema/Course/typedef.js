const { gql } = require('apollo-server-express');

module.exports = gql`
scalar URL

extend type Query {
  course(id:ID!): Course
  courses(limit:Int,after:ID): [Course]
}

extend type Mutation {
  addCourses(courseInsertionInputs: [CourseInsertionInput]!): [Course!]!
  editCourses(courseEditInputs:[CourseEditInput!]!): [Course!]!
  deleteCourses(ids:[ID!]!): [Course!]!
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