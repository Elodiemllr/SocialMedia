// fait référence à l'objet router d'express
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// crée utilisateur
// Sur route "api/user/register" , l'utilisateur pourra s'enregistrer
// (on déclenche dans le dossier authController la fonction signUp)
router.post("/register", authController.signUp);
// se connecter
router.post("/login", authController.signIn);
//se deconnecter (reprise du token)
router.get("/logout", authController.logout);

// User DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
module.exports = router;
