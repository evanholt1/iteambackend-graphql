const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

const Course = require('../../models/course');


module.exports = {
  Query : {
    courseNotebook: async (_, args) => {
      if (!isValidObjectId(args.courseId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: Object.keys(args),
        });
      if (!isValidObjectId(args.id)) 
        throw new UserInputError('id field is not a proper objectId', {
          invalidArgs: Object.keys(args),
        });
        const course = await Course.findById(args.courseId).exec();
        const result = await course.notebooks.id(args.id); // .id is a special subdocument find method(check docs)
        return result;
    },

    courseNotebooks: async (_, args) => {
      if (!isValidObjectId(args.courseId)) 
        throw new UserInputError('course id field is not a proper objectId', {
          invalidArgs: Object.keys(args),
        });

      const course = await Course.findById(args.courseId).exec();
      return course.notebooks;
    }
  },
  Mutation: {
    addCourseNotebook: async (_, args) => {
      const course = await Course.findById(args.courseId).exec();
      args.notebookInsertionInput.url = args.notebookInsertionInput.url.host;
      course.notebooks.push(args.notebookInsertionInput);
      await course.save();
      return course.notebooks[course.notebooks.length - 1];
    },

    editCourseNotebook: async (_, {courseId, notebookEditInput} ) => {
      const course = await Course.findById(courseId).exec();
      const notebook = await course.notebooks.id(notebookEditInput._id);
      notebook.set(notebookEditInput);
      course.save();
      return notebook;
    },

    deleteCourseNotebook: async (_, { courseId, id }) => {
      const course = await Course.findById(courseId).exec();
      const notebook = course.notebooks.id(id);
      notebook.remove();
      course.save();
      return notebook;
    }
  }
}