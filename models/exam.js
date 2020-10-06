// npm imports
// npm imports
const mongoose = require('mongoose');

// file imports
const baseQuestionSchema = require('./questions/base');
const mcqSchema = require('./questions/mcq');
const tfqSchema = require('./questions/tfq');
const matchSchema = require('./questions/match');
const essaySchema = require('./questions/essay');


let ExamSchema = new  mongoose.Schema({
  title: {
    type: String,
    maxlength: 32,
    required: true
  },
  description: {
    type: String, 
    maxlength: 300,
    required: true
  },
  questions: [baseQuestionSchema]
});

// types of questions in the questions array:
ExamSchema.path('questions').discriminator("MCQ",mcqSchema);
ExamSchema.path('questions').discriminator("TFQ",tfqSchema);
ExamSchema.path('questions').discriminator("MATCH",matchSchema);
ExamSchema.path('questions').discriminator("ESSAY",essaySchema);


module.exports = ExamSchema;

