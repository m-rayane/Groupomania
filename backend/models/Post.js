const { readFileSync } = require('fs');
const mongoose = require('mongoose');

    
const postSchema = new mongoose.Schema(
    {
      posterId: { type: String, required: true },
      message: { type: String, trim: true },
      image: { type: String },
      likes: { type: Number, default: 0 },  
      usersLiked: { type: [String]},  
      comments: {
        type: Array({
          commenterId: String,
          text: String,
        }),
        require: true,
      },
    },
    {
      timestamps: true
    }
  )


module.exports = mongoose.model('Post', postSchema);