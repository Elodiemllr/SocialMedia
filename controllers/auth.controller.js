//const UserModel = require ('../models/user.model');


// fonction sign up/inscription , connexion deconnexion en async

//sign Up 
module.exports.signUp = async (req, res) => {
    // req.body contient les informations (données) renseigné de mon user donc req.body.pseudo, req.body.email etc.
    console.log (req.body)
    // ce qu'on va demander lors de l'inscription 
    const{pseudo, email, password} = req.body 

    //la réponse à la création de l'utilisateur nous renvoie un status avec l'id. "Si la fonction à marché alors renvoie nous un status 201 avec l'id" 
    try { 
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id})
    }
    //si on a un soucis on r'envoie l'erreur dans la console 
    catch(err) {
        res.status(200).send({err})
    }
}