// npm imports
const mongoose = require('mongoose');


const baseQuestionSchema = new mongoose.Schema({
  text : {
    type : String,
    required : "Must Provide Text!",
    maxlength : 300
  }
}
,{discriminatorKey:"type"});


module.exports = baseQuestionSchema;






