// file imports
const Course = require('../../../models/course');


module.exports = {
  Query : {
    course: async (_, { id }, context) => {
      return context.models.Course.getOneById(id);
    },

    courses: (_, { limit, after } , context) => {
      return context.models.Course.getMany(limit, after);
    },
    test : () => {
      return {
        __typename:"NotFound",
        message:"found"
      }
    }
  },
  Mutation : {
    addCourses : (_,{ courseInsertionInputs }, context) => {
      return context.models.Course.addMany(courseInsertionInputs, context.user);
    },

    // important: using object.keys() can be a logical replacement to .set()
    editCourses: async(_, { courseEditInputs }, context) => {
      return context.models.Course.editMany(courseEditInputs);
    },
    
    deleteCourses: (_, { ids }, context ) => {
      return context.models.Course.deleteMany(ids);
    }
  }
}