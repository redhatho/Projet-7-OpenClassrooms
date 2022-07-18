const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');
//Créer un commentaire
router.post('/comment/:id', auth, commentController.createComment);
//Modifier un commentaire
router.put('/comment/:id', auth, commentController.modifyComment);
//Supprimer un commentaire
router.delete('/comment/:id', auth, commentController.deleteComment);
// //Trouver un commentaire
router.get('/', auth, commentController.getOneComment);
// //Trouver tout les commentaires
router.get('/comment/', auth, commentController.getAllComment);
module.exports = router;
