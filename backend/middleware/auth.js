const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// decode token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    console.log(req.headers.authorization)
    res.status(403).json({ error })
  }
}
