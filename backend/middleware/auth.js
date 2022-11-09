const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// decode token
module.exports = (req, res, next) => {
  console.log(req.cookies.jwt)
  try {
    const token = req.cookies.jwt
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    console.log('auth error')
    res.status(403).json({ error })
  }
}
