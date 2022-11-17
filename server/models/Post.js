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
      unique: true,
    },
    ref: 'users',
    timestamp: Date
  }],
  comments: [{
    user_id: mongoose.Schema.Types.ObjectId,
    message: String,
    timestamp: Date
  }],
  image_url: String,
  created_time: Date,
})

module.exports = mongoose.model('posts', PostSchema)