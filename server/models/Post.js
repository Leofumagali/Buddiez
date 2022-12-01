const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  location: String,
  description: String,
  image_url: {
    type: String,
    required: true
  },
  image_public_id: {
    type: String,
    required: true
  },
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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  created_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('posts', PostSchema)