const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
// const UserModel = require('../models/user')
 
// decode token
module.exports.auth = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN,);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(403).json({ error });
   }
};
