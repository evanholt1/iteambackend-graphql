// npm imports
const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

// file imports
const Course = require('../../models/course');

module.exports =  generateUserModel = () => ({
  
  // ***** ******* *****
  // ***** Queries *****
  // ***** ******* *****

  getOneById: (id) => {
    if (!isValidObjectId(id)) {
      throw new UserInputError('id field is not a proper objectId', {
        invalidArgs: Object.keys(id),
      });
    }
    return Course.findById(id).lean().exec();
  },

  getMany: (limit, after) => {
    if(!limit)
      return Course.find().lean().exec();
    if(!after) 
      return Course.find().limit(limit).lean().exec();

    let courses = Course.find({ _id: { $gt:after } } ).limit(limit).lean().exec();
    
    // if an _id was deleted, find the documents after the _id just before the one deleted, returning the same results.
    while(!courses)
      courses = Course.find({ _id: { $lt:after } }).sort({ _id: -1 }).limit(1).lean().exec();

    return courses;
  },

  // *****           *****
  // ***** mutations *****
  // *****           *****

  addMany: async (coursesInputs) => {
    let courses = []; 

    let coursesAdded = await Course.create(coursesInputs); // create accepts an array, and deals with it properly
    
    coursesAdded.forEach(course => {
      courses.push(course.toObject( { getters:true } ));
    });

    return courses;
  },

  editMany: (coursesInputs) => {
    let updatedCourses = [];

    coursesInputs.forEach(courseInput => {
      let updatedCourse = Course.findByIdAndUpdate(courseInput._id, courseInput, {new: true} ).exec();

      updatedCourses.push(updatedCourse);
    })

    return updatedCourses;
  },

  deleteMany: async (coursesIds) => {
    const coursesToDelete = await Course.find({ _id: { $in:coursesIds } }).exec();

    coursesToDelete.forEach(course => {
      course.remove();

      course = course._doc;
    });

    return coursesToDelete;
  }
  
});