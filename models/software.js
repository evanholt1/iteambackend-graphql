// npm imports
const mongoose = require('mongoose');

let SoftwareSchema = new  mongoose.Schema({
    title: {
        type: String,
        maxlength: 32
    },
    description: {
        type: String,
        maxlength: 300
    },
    url: {
        type: String
    },
    image: {
        type: String,
        required:true
    }
});

module.exports = SoftwareSchema;