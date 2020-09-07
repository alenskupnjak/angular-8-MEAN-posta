const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  content: {
    type:String,
    required: true
  },

})

// prilikom kreiranja prvog zapisa mongoose kreira mnozinu lovercasse ('Post' --> 'posts')
module.exports = mongoose.model('Post', postSchema);