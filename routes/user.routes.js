//fait référence à l'objet router d'express
const router = require ('express').Router
const authController = require('../controllers/auth.controller');


//crée utilisateur
//Sur route "api/user/register" , l'utilisateur pourra s'enregistrer (on déclenche dans le dossier authController la fonction signUp)
router.post("/register", authController.signUp);

module.exports = router;