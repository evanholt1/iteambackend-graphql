const { gql } = require('apollo-server-express');

module.exports = gql`
scalar URL

union CourseGetResult = Course | NotFound


extend type Query {
  course(id:ID!): CourseGetResult
  courses(limit:Int,after:ID): [Course]
  test: CourseGetResult 
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

type NotFound {
  message: String!
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