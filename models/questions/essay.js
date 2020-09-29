// npm imports
const mongoose = require('mongoose');


const essaySchema = new mongoose.Schema({ 
  answer : { 
    type: String, 
    required: true, 
    maxlength : 300
  }
});


module.exports = essaySchema;