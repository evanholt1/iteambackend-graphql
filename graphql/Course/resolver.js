const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

const Course = require('../../models/course');


module.exports = {
  Query : {
    course: async (_, args) => {
      if (!isValidObjectId(args.id)) {
        throw new UserInputError('id field is not a proper objectId', {
          invalidArgs: Object.keys(args),
        });
      }
      return Course.findById(args.id).lean().exec();
    },
    courses: () => {
      return Course.find().lean().exec();
    }
  },
  Mutation : {
    insertCourse : (_,args) => {
      return Course.create(args.CourseInsertionInput);
    },
    editCourse: async(_, args) => {
      const course = await Course.findById(args.courseInput._id).exec();
      course.set(args.courseInput);
      await course.save();
      return course;
    },
    deleteCourse: (_,args) => {
      return Course.findByIdAndDelete(args.id).exec();
    }
  }
}