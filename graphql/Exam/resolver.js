const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

const Course = require('../../models/course');


module.exports = {
  Query : {
    courseExam: async (_, { courseId, id } ) => {
      if (!isValidObjectId(courseId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: "courseId",
        });
      if (!isValidObjectId(id)) 
        throw new UserInputError('id field is not a proper objectId', {
          invalidArgs: "id",
        });
        const course = await Course.findById(courseId).exec();
        const result = await course.exams.id(id); 
        return result;
    },

    courseExams: async (_, { courseId }) => {
      if (!isValidObjectId(courseId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: Object.keys(courseId),
        });

      const course = await Course.findById(courseId).exec();
      return course.exams;
    }
  },
  Mutation: {
    addCourseExams: async (_, { courseId, examInsertionInputs }) => {
      const course = await Course.findById(courseId).exec();
      
      for (let i = 0; i < examInsertionInputs.length; i++) {
        course.exams.push(examInsertionInputs[i]);
      }
      
      await course.save();
      return course.exams;
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