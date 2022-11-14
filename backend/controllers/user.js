const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const User = require('../models/User')

const defaultPicture = 'http://localhost:4200/images/default/default-avatar.png'

const tokenExpiresIn = 24 * 60 * 60 * 1000

// to signup a new user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() =>
          res.status(201).json({ message: 'user is created successfully !' })
        )
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// to login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Password doesn't match with email." })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Password doesn't match with email." })
          }
          const createdToken = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: tokenExpiresIn }
          )
          res.cookie('jwt', createdToken, { httpOnly: true, tokenExpiresIn })
          res.status(200).json({
            userId: user._id,
            isAdmin: user.isAdmin,
            tokenExpiration: jwt.verify(
              createdToken,
              process.env.ACCESS_SECRET_TOKEN
            ).exp,
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// to get all users
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find().select('-password')
  res.status(200).json(users)
}

// to get one user
exports.getUserData = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  res.status(200).json(user)
  res.status(200)
}

//to logout
exports.logout = (req, res, next) => {
  res.clearCookie('jwt')
  console.log('You are deconnected')
}

// to edit an user
exports.editUser = (req, res, next) => {
  if (req.body.isAdmin === 1 || req.body.userId === req.auth.userId) {
    const userObject = req.file
      ? {
          profilePicture: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body }
    User.findOne({ _id: req.params.id }).then((user) => {
      if (req.file && user.profilePicture !== defaultPicture) {
        const filename = user.profilePicture.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          console.log('Former image is removed')
        })
      }
      User.updateOne(
        { _id: req.params.id },
        { ...userObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: 'User updated' }))
        .catch((error) => res.status(400).json({ error }))
    })
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

// not active yet because we must implement to delete all posts and comments user

// exports.deleteUser = (req, res, next) => {
//   User.findOne({ _id: req.params.id }).then((user) => {
//     const filename = user.profilePicture.split('/images')[1]
//     fs.unlink(`images/${filename}`, () => {
//       User.deleteOne({ _id: req.params.id })
//         .then(() => {
//           res
//             .status(200)
//             .json({ message: "User and user's data has been delete" })
//         })
//         .catch((error) => res.status(400).json({ error }))
//     })
//     // }
//     if (!user) {
//       res.status(404).json({ message: 'No user to delete' })
//     }
//   })
// }
