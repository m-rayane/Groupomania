const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default: 'http://localhost:4200/images/default/default-avatar.png',
  },
  isAdmin: { type: Number, default: 0 },
  likes: { type: [String] },
  posts: { type: [String] },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
