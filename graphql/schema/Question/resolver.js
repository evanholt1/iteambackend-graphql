const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

const Course = require('../../../models/course');


module.exports = {
  Question : {
    // for graphql to know which type to validate & check on
    __resolveType (question, context, info) {
      return `${question.type.toLowerCase()}Question`; 
    }
  },
  Query : {
    examQuestion: async (_, { courseId, examId, id } ) => {
      if (!isValidObjectId(courseId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: "courseId",
        });
      if (!isValidObjectId(examId)) 
        throw new UserInputError('id field is not a proper objectId', {
          invalidArgs: "id",
        });
      if (!isValidObjectId(id)) 
        throw new UserInputError('id field is not a proper objectId', {
          invalidArgs: "id",
        });

        const course = await Course.findById(courseId).exec();
        const exam = await course.exams.id(examId); 
        const question = await exam.questions.id(id);

        return question;
    },

    examQuestions: async (_, { courseId, examId }) => {
      // id inputs ObjectId validation
      if (!isValidObjectId(courseId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: Object.keys(courseId),
        });
      if (!isValidObjectId(examId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: Object.keys(courseId),
        });

      const course = await Course.findById(courseId).exec();
      const exam = await course.exams.id(examId); 
      return exam.questions;
    }
  },
  Mutation: {
    addExamQuestions: async (_, { courseId, examId, questionInsertionInputs }) => {
      const course = await Course.findById(courseId).exec();
      const exam = await course.exams.id(examId); 

      // modifies input to fit output & DB storage
      questionInsertionInputs.forEach(questionInput => {
        //const type = questionInput.type.toLowerCase();
        
        // store fields other than text & type in 'otherFields'
        let {text, type, ...otherFields } = questionInput; 

        // add properties of otherFields's properties as top-level properties in the questionInput itself
        Object.entries(Object.values(otherFields)[0]).forEach(property => {
          questionInput[property[0]] = property[1];
        });

        // remove the now useless other fields property (its values are now top-level)
        delete questionInput[Object.keys(otherFields)[0]];

        exam.questions.push(questionInput);
      });
      await course.save();
      
      return questionInsertionInputs;
    },

    // important: using object.keys() can be a logical replacement to .set()
    editCourseExams: async (_, {courseId, examEditInputs} ) => {
      const course = await Course.findById(courseId).exec();

      let updatedExams = [];
      examEditInputs.forEach(examEdit => {
        const exam = course.exams.id(examEdit._id);
        updatedExams.push(exam);
        exam.set(examEdit);
      });
      //const exam = await course.exams.id(examEditInput._id);
      //exam.set(examEditInput);
      course.save();
      return updatedExams;
    },

    deleteCourseExams: async (_, { courseId, ids }) => {
      const course = await Course.findById(courseId).exec();

      let deletedExams = [];
      ids.forEach(id => {
        const exam = course.exams.id(id);
        deletedExams.push(exam);
        exam.remove();
      })
      course.save();
      return deletedExams;
    }
  }
}