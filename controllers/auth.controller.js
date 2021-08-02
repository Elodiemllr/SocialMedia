const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

 //24 * 60 * 60 * 1000 = 1 journée / 3 = 3 journée 
 const maxAge = 3 * 24 * 60 * 60 * 1000;

//createToken va nous generer un token 
//on créer le token avec l'id de notre user afin de l'utilisé dans notre function signIn 
const createToken = (id) => {
    // lorsque JWT va creer un jeton il va  prendre l'id de l'user, notre variable d'environnement token secret et son token 
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        //24 * 60 * 60 * 1000 = 1 journée / 3 = 3 journée 
        expiresIn: maxAge
    })
};

// fonction sign up/inscription , connexion deconnexion en async

//sign Up 
module.exports.signUp = async (req, res) => {
    // req.body contient les informations (données) renseigné de mon user donc req.body.pseudo, req.body.email etc.
    // ce qu'on va demander lors de l'inscription 
    const {pseudo, email, password} = req.body

    // dans notre const user nous auront les informations que l'user a renseigné (pseudo:pseudo, email:email etc.)
    //la réponse à la création de l'utilisateur nous renvoie un status avec l'id. "Si la fonction à marché alors renvoie nous un status 201 avec l'id" 
    try {
        const user = await UserModel.create({pseudo, email, password });
        res.status(201).json({ user: user._id});
      }
    //si on a un soucis on r'envoie l'erreur dans la console 
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
      }
    }

// Se connecter
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
    try {
        // on lui demande son email et son password et on verifie qu'il existe dans notre bdd et on stock ça dans "user"
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        // la réponse sera notre code jwt (id+token secret), le token et httpOnly car il sera consultable que par notre serveur 
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        //on envoie un status 200 voir si tout est ok 
        res.status(200).json({ user: user._id})
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).json({ errors });
      }
    }

    module.exports.logout = (req, res) => {
      //on lui "retire" le cookie 'jwt'. 
      res.cookie('jwt', '', { maxAge: 1 });
      //on le redirige lorsqu'il se deconnecte 
      res.redirect('/');
    }