const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  location: String,
  description: String,
  likes: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user_id: mongoose.Schema.Types.ObjectId,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  image_url: String,
  created_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('posts', PostSchema)