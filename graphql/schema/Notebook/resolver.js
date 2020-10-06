const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

const Course = require('../../../models/course');


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
    addCourseNotebooks: async (_, { courseId, notebookInsertionInputs }) => {
      const course = await Course.findById(courseId).exec();
      
      for (let i = 0; i < notebookInsertionInputs.length; i++) {
        notebookInsertionInputs[i].url = notebookInsertionInputs[i].url.host
        course.notebooks.push(notebookInsertionInputs[i]);
      }
      
      await course.save();
      return course.notebooks;
    },
    // important: using object.keys() can be a logical replacement to .set()
    editCourseNotebooks: async (_, {courseId, notebookEditInputs} ) => {
      const course = await Course.findById(courseId).exec();

      let updatedNotebooks = [];
      notebookEditInputs.forEach(notebookEdit => {
        const notebook = course.notebooks.id(notebookEdit._id);
        updatedNotebooks.push(notebook);
        notebook.set(notebookEdit);
      });
      //const notebook = await course.notebooks.id(notebookEditInput._id);
      //notebook.set(notebookEditInput);
      course.save();
      return updatedNotebooks;
    },

    deleteCourseNotebooks: async (_, { courseId, ids }) => {
      const course = await Course.findById(courseId).exec();

      let deletedNotebooks = [];
      ids.forEach(id => {
        const notebook = course.notebooks.id(id);
        deletedNotebooks.push(notebook);
        notebook.remove();
      })
      course.save();
      return deletedNotebooks;
    }
  }
}