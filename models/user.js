const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var userSchema = new Schema({
  first_name: {
    type: String,
    maxlength: 32,
    trim: true
  },
  last_name: {
    type: String,
    maxlength: 32,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  // note: the actual password MUST BE between 8 & 64 characters
  hashed_password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum:["user","admin"]
  },
  // stores the courses' data that the user watches, along his exam grades
  courses: [{
    courseId: {
      type: Schema.Types.ObjectId, 
      ref: 'Course',
    },
    videos: [{
      type: Schema.Types.ObjectId, 
    }],
    testbanks: [{
      type: Schema.Types.ObjectId, 
    }],
    notebooks: [{
      type: Schema.Types.ObjectId, 
    }],
    softwares: [{
      type: Schema.Types.ObjectId, 
    }],
    exams:[{
      examId: {
        type: Schema.Types.ObjectId
      },
      examGrade: {
        type: Number
      }
    }]
  }]
});

userSchema.virtual('password')
  .set(async function(password) {
    if(password.length < 8 || password.length > 64)
      return res.status(400).json({error:"Password Must be between 8 & 64 characters!"});
    this._password = password; // just sets this _password value for the validation underneath
  });

// changes password if provided. necessary to validate 'hashed_password' with the virual 'password' & its setter
userSchema.pre("validate", async function (next) {
  if (!this._password) {
      return next();
  }
  this.hashed_password = await bcrypt.hash(this._password,10);
});



userSchema.methods = {
  comparePasswords: async function(inputPassword) {
    try {
      return await bcrypt.compare(inputPassword, this.hashed_password);
    } 
    catch (error) {
      res.status(500).json({error:"Server Error Occured!"});
    }
  }
};


module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const uuidv1 = require('uuid/v1');

// var userSchema = new mongoose.Schema({
//     first_name: {
//         type: String,
//         required: true,
//         maxlength: 32,
//         trim: true
//     },
//     last_name: {
//         type: String,
//         maxlength: 32,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true
//     },
//     user_info: {
//         type: String,
//         trim: true
//     },
//     encrypt_password: {
//         type: String,
//         required: true
//     },
//     salt: String,
//     role: {
//         type: Number,
//         default: 0
//     },
//     courses: {
//         type: Array,
//         default: []
//     }
// }, {timestamps: true});

// userSchema.virtual('password')
//     .set(function (password) {
//         this._password = password;
//         this.salt = uuidv1();
//         this.encrypt_password = this.securePassword(password)
//     })
//     .get(function () {
//         return this._password;
//     })

// userSchema.methods = {
//     securePassword: function (plainPassword) {
//         if (!plainPassword) return "";
//         try {
//             return crypto.createHmac('sha256', this.salt)
//                 .update(plainPassword)
//                 .digest('hex');
//         }catch (error) {
//             return "Validation error occured";
//         }
//     },
//     authenticate: function(plainPassword) {
//         return this.securePassword(plainPassword) === this.encrypt_password;
//     }
// };


// module.exports = mongoose.model('User', userSchema);