const mongoose = require('mongoose');

let VideoSchema = new  mongoose.Schema({
    url: {
        type: String,
        required: true
    },
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
    image: {
        type: String,
        required:true
    }
});

module.exports = VideoSchema;