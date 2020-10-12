const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
    session: ID!
}
extend type Mutation {
    signin(email: EmailAddress!, password: String!): User
    signout(session: ID!): ID
    signup(email: EmailAddress!, password: String!, passwordConfirmation: String!,role: Role): User
    protectedRoute: String
    test: Int
    regenerateSession: Int
}

type User {
    _id: ID!
    first_name: String
    last_name: String
    email: EmailAddress
    role: Role
    courses: [UserCourse]
}

type UserCourse {
    courseId: ID!
    videos: ID!
    testbanks: ID!
    notebooks: ID!
    softwares: ID!
    exams: [UserExam]
}

type UserExam {
    examId: ID!
    examGrade: NonNegativeFloat!
}

enum Role {
    USER
    EDITOR
    ADMIN
}
`;