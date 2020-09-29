// npm imports
const mongoose = require('mongoose');


const matchSchema = new mongoose.Schema({ 
  options : {
    type : [String], 
    required: (true, 'Must Provide Options for Question!') 
  },
  answers : {
    type : [String], 
    required: (true, 'Must Provide Options for Answer!') 
  }
});


module.exports = matchSchema;