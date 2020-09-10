const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    }
  },
  { timestamps: true }
);

//unique: true,  ne garantira da se nece snimiti user sa istim emailom!!!!!
// provjerava prije snimanja userModela, a vezuje se na unique:true
userSchema.plugin(uniqueValidator);

// prilikom kreiranja prvog zapisa mongoose kreira mnozinu lovercasse ('Post' --> 'posts')
module.exports = mongoose.model('User', userSchema);
