// npm imports
const mongoose = require('mongoose');

let NotebookSchema = new  mongoose.Schema({
    title: {
        type: String,
        maxlength: 32,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    url: {
        type: String,
        required: true
    },
    // We could use Buffer, but since we want to make it lightweight we used urls
    image: {
        type: String
    }
});

module.exports = NotebookSchema;