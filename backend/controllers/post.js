const Post = require('../models/Post');
const fs = require('fs');

// to get all posts to display on all post page
exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then((posts) => {      
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(400).json({
          error: error
        });
    });
};

// ot get one post to display on single post page
exports.getOnePost = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    })
    .then((post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  



exports.createPost = (req, res) => {
    const postObject = req.body;
    if (req.body.image === 'null') {
      const post = new Post({
        ...postObject,
      })
      post
        .save()
        .then(() => res.status(201).json({ message: 'Post saved !' }))
        .catch((error) => res.status(400).json({ error }))
    } else {
      const post = new Post({
        ...postObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    
      })
      post
        .save()
        .then(() => res.status(201).json({ message: 'Post saved !' }))
        .catch((error) => res.status(400).json({ error }))
    }
  }

//  to modify a post
exports.modifyPost = (req, res, next) => {
  console.log(req.body)
    const postObject = req.file ? {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    console.log(postObject)
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (post.posterId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Article is modified'}))
                .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//to delete a post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
      .then(post => {
        console.log(post)
          if (post.posterId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized !'});
          } else {
              const filename = post.image.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Article is deleted !'})})
                      .catch(error => res.status(401).json({ message: 'Article is NOT deleted !' }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};



//to like or dislike a post
exports.likePost = (req, res, next) => {
    // if click on like button like = 1
    if (req.body.like === 1) {
        Post.updateOne(
            { _id: req.params.id },
            {$inc: { likes: 1 }, $push: { usersLiked: req.body.userId }}
        )
        .then(() => res.status(200).json({ message: 'Like is added !' }))
        .catch(error => res.status(400).json({ error }))
    // if click on dislike button like = -1
    } else if (req.body.like === -1) {
        Post.updateOne(
            { _id: req.params.id },
            { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }
        )
        .then(() => res.status(200).json({ message: 'Dislike is added !' }))
        .catch(error => res.status(400).json({ error }))
    // if unclick like or dislike button like = 0
    } else {
        Post.findOne({ _id: req.params.id })
            .then(post => {
                // if user already like
                if (post.usersLiked.includes(req.body.userId)) {
                    Post.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
                    )
                    .then(() => { res.status(200).json({ message: 'Like is deleted !' }) })
                    .catch(error => res.status(400).json({ error }))
                // if user already dislike
                } else if (post.usersDisliked.includes(req.body.userId)) {
                    Post.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } }
                    )
                    .then(() => { res.status(200).json({ message: 'Dislike is deleted !' }) })
                    .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
}