const mongoose = require('mongoose');

let TestBankSchema = new  mongoose.Schema({
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
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    }
});

module.exports = TestBankSchema;
