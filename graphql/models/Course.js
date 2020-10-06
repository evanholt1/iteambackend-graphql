// npm imports
const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

// file imports
const Course = require('../../models/course');

module.exports =  generateUserModel = () => ({
  getOne: (id) => {
    if (!isValidObjectId(id)) {
      throw new UserInputError('id field is not a proper objectId', {
        invalidArgs: Object.keys(id),
      });
    }
    return Course.findById(id).lean().exec();
  },
  getAll: () => { 
    return Course.find().lean().exec();
   },
  getMany: (limit, after) => {
    if(!limit)
      return Course.find().exec();
    if(!after) 
      return Course.find().limit(limit).exec();
    return Course.find({ _id: { $gt:after } } ).limit(limit).exec();
  },

  // *****           *****
  // ***** mutations *****
  // *****           *****

  addMany: (coursesInputs) => {
    return Course.create(coursesInputs); // create accepts an array, and deals with it properly
  }
 });