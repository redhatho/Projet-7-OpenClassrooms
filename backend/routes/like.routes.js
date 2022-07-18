const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like.controller');

const auth = require('../middleware/auth.middleware');

//Poster un like sur un post avec son id
router.post('/:id', auth, likeController.likePost);

//Trouver les likes d'un post
router.get('/getLikes', likeController.getLikes);

module.exports = router;
