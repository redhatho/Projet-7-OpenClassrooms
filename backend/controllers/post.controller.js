const Post = require('../models/post.model');
const User = require('../models/user.model');

const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// //Variable d'environnement
require('dotenv').config();

//Création d'un post
exports.createPost = (req, res, next) => {
  const postObject = req.file
    ? {
      ...req.body,
      description: req.body.description,
      imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename
        }`,
    }
    : {
      ...req.body,
      imagePost: null,
      description: req.body.description,
    };
  const post = new Post({
    ...postObject,
  });
  post
    .save()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => res.status(401).json({ message: error }));
};

//Modification d'un post
exports.updatePost = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (post.userId === decodedToken.userId || decodedToken.admin) {
        let filename = post.imagePost.split('/images/')[1];

        const postObject = req.file
          ? {
            ...req.body,
            imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename
              }`,
          }
          : {
            ...req.body,
          };
        Post.update({ ...postObject }, { where: { postId: req.params.id } })
          .then(() => {
            if (filename && req.file) {
              fs.unlink(`images/${filename}`, (err) => {
                if (err) console.log(err);
              });
            }
            return res.status(200).json({ message: 'Success' });
          })
          .catch((error) => res.status(500).json({ error }));
      } else if (post.userId !== decodedToken.userId) {
        return res.status(401).json({ message: `Not authorized` });
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

//Trouver un post
exports.readOnePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Trouver tout les posts
exports.readAllPost = (req, res, next) => {
  Post.findAll({
    raw: true,
    include: {
      model: User,
    },
    order: [['postId', 'DESC']],
  })
    .then((post) => {
      Comment.findAll({
        raw: true,
        include: {
          model: User,
        },
      }).then((comments) => {
        comments.forEach((message) => {
          const index = post.findIndex(
            (post) => post.postId === message.postPostId
          );
          if (index > -1) {
            if (!post[index].comments) {
              post[index].comments = [];
            }
            post[index].comments.push(message);
          }
        });
        return res.status(200).json(post);
      });
    })

    .catch((error) => res.status(400).json({ error }));
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(401).json({ message: `Post not found` });
      }
      let postUserId = post.userId;
      let token = req.headers.authorization.split(' ')[1];
      let decodedToken = jwt.verify(token, '${process.env.TOKEN}');

      let admin = decodedToken.admin;
      let userId = decodedToken.userId;
      if (admin) {
        postUserId = userId;
      }

      if (postUserId !== userId) {
        return res.status(401).json({ message: `Not authorized` });
      } else {
        if (post.imagePost) {
          const filename = post.imagePost.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { postId: req.params.id } })
              .then(() => res.status(200).json({ message: 'Post delete !' }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Post.destroy({ where: { postId: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post delete !' }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
