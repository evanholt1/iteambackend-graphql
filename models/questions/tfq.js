// npm imports
const mongoose = require('mongoose');


const tfqSchema = new mongoose.Schema({ 
  answer : {
    type : Boolean,
    required : true
  }
});


module.exports = tfqSchema;