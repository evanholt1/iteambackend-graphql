// file imports
const Course = require('../../../models/course');


module.exports = {
  Query : {
    course: async (_, { id }, context) => {
      return context.models.Course.getOne(id);
    },
    courses: (_, { limit, after } , context) => {
      //return context.models.Course.getAll();
      return context.models.Course.getMany(limit, after);
      
    }
  },
  Mutation : {
    addCourses : (_,{ courseInsertionInputs }, context) => {
      return context.models.Course.addMany(courseInsertionInputs);
      //return Course.create(args.CourseInsertionInput);
    },
    // important: using object.keys() can be a logical replacement to .set()
    editCourses: async(_, args) => {
      const course = await Course.findById(args.courseInput._id).exec();
      course.set(args.courseInput);
      await course.save();
      return course;
    },
    deleteCourses: (_,args) => {
      return Course.findByIdAndDelete(args.id).exec();
    }
  }
}