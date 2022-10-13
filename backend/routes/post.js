const express = require('express');
const router = express.Router();
// const auth = require('../middleware/authMiddleware');
const multer = require('../middleware/multer-config');

const path = require('path');

const postCtrl = require('../controllers/post');

router.get('/posts', postCtrl.getAllPosts);
router.post('/posts', multer, postCtrl.createPost);
router.get('/posts/:id', postCtrl.getOnePost);
router.put('/posts/:id', postCtrl.modifyPost);
router.delete('/posts/:id', postCtrl.deletePost);


module.exports = router;