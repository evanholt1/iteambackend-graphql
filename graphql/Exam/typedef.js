const { gql } = require('apollo-server-express');

module.exports = gql`
scalar URL

extend type Query {
  courseExam(courseId:ID!,id:ID!): Exam!
  courseExams(courseId:ID!): [Exam!]!
}

extend type Mutation {
  addCourseExams(courseId: ID!, examInsertionInputs: [ExamInsertionInput!]!): [Exam!]!
  editCourseExams(courseId: ID!, examEditInputs: [ExamEditInput!]!): [Exam!]!
  deleteCourseExams(courseId: ID!, ids: [ID!]!): [Exam!]!
}

type Exam {
  _id: ID!
  title: String!
  description: String!
  #questions: [Question!]!
}

input ExamInsertionInput {
  title: String!
  description: String
  #questions: [Question!]
}

input ExamEditInput {
  _id: ID!
  title: String
  description: String
  #questions: [Question!]
}
`