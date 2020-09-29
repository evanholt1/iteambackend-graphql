// npm imports
const mongoose = require('mongoose');


const mcqSchema = new mongoose.Schema({ 
  options : {
    type : [String], 
    required: (true, 'Must Provide Options for Answer!') 
  },
  answer : { 
    type: Number, 
    required: true 
    // validate : {
    //   validator : Number.isInteger,
    //   message   : '{VALUE} is not an integer value'
    // }
  }
});


module.exports = mcqSchema;