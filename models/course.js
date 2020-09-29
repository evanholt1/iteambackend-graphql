// npm imports
const mongoose = require('mongoose');

// file imports 
const SoftwareSchema = require('./software');
const VideoSchema = require('./video');
const TestBankSchema = require('./testbank');
const ExamSchema = require('./exam');
const NotebookSchema = require('./notebook');

let courseSchema = new  mongoose.Schema({
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
    videos: [VideoSchema],
    softwares: [SoftwareSchema],
    testbanks: [TestBankSchema],
    exams: [ExamSchema],
    notebooks : [NotebookSchema]
});

module.exports = mongoose.model('Course',  courseSchema);