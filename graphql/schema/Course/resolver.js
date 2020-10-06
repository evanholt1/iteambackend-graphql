// file imports
const Course = require('../../../models/course');


module.exports = {
  Query : {
    course: async (_, { id }, context) => {
      return context.models.Course.getOne(id);
    },
    courses: () => {
      return context.models.Course.getAll();
      
    }
  },
  Mutation : {
    insertCourse : (_,args) => {
      return Course.create(args.CourseInsertionInput);
    },
    // important: using object.keys() can be a logical replacement to .set()
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