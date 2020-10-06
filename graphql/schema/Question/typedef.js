const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
  examQuestion(courseId:ID!, examId:ID!, id:ID!): Question!
  examQuestions(courseId:ID!, examId:ID!): [Question!]!
}

extend type Mutation {
  addExamQuestions(courseId: ID!, examId:ID!, questionInsertionInputs: [QuestionInsertionInput!]!): [Question!]!
  #editExamQuestions(courseId: ID!, examEditInputs: [ExamEditInput!]!): [Exam!]!
  deleteExamQuestions(courseId: ID!, ids: [ID!]!): [Exam!]!
}

interface Question {
  _id: ID!
  text: String!
  type: QuestionType!
}

type essayQuestion implements Question {
  _id: ID!
  text: String!
  answer: String!
  type: QuestionType!
}
# check aliases for the problem of returning 'answer' between differing question types.
type matchQuestion implements Question {
  _id: ID!
  text: String!
  options: [String!]!
  answers: [String!]!
  type: QuestionType!
}

type mcqQuestion implements Question {
  _id: ID!
  text: String!
  options: [String!]!
  answer: Int!
  type: QuestionType!
}

type tfqQuestion implements Question {
  _id: ID!
  text: String!
  answer: Boolean!
  type: QuestionType!
}

enum QuestionType {
  MCQ
  TFQ
  MATCH
  ESSAY
}

#################### #################### ####################
################### Insertion Input Types ####################
#################### #################### ####################

input QuestionInsertionInput {
  text: String!
  type: QuestionType!
  essayParams : essayQuestionInsertionInput
  mcqParams : mcqQuestionInsertionInput
  matchParams : matchQuestionInsertionInput
  tfqParams : tfqQuestionInsertionInput
}

input essayQuestionInsertionInput {
  answer: String!
}

input matchQuestionInsertionInput {
  options: [String!]!
  answers: [String!]!
}

input mcqQuestionInsertionInput {
  options: [String!]!
  answer: Int!
}

input tfqQuestionInsertionInput {
  answer: Boolean!
}
`;

// todo: find out how graphql handles inputs with mutations(examquestioninput input. how it differentiates
//          between types of questions)