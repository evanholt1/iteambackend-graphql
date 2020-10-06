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
  getById: (id) => { /* fetching/transform logic for a single user */ },
  getByGroupId: (id) => { /* fetching/transform logic for a group of users */ },
 });