// npm imports
const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

// file imports
const User = require('../../models/user');

module.exports =  generateUserModel = (sessionId) => ({

  // *****           *****
  // ***** mutations *****
  // *****           *****

  signup: async (signupInput) => {
    let email = signupInput.email;
    const emailAlreadyExists = await User.findOne({ email }).lean().exec();
    if(emailAlreadyExists){
        return null;
    }

    if(signupInput.password !== signupInput.passwordConfirmation)
        return null;

    const { passwordConfirmation, ...userCreationInput } = signupInput;
    const newUser = await User.create(userCreationInput);
    return newUser;
  },

  signin: async (signinInput, req) => { 
    const user = await User.findOne({ email: signinInput.email }).lean().exec();
  
    if(!user) 
        return null;
    
    req.session._id = user._id;
    req.session.loginDate = Date.now();

    return user;
  }


});