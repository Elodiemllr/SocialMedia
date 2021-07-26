const UserModel = require ('../models/user.model');


// fonction sign up/inscription async
module.exports.signUp = async (req, res) => {
    // ce qu'on va demander lors de l'inscription 
    const{pseudo, email, password} = req.body 

    //la réponse à la création de l'utilisateur nous renvoie un status avec l'id
    try { 
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id})
    }
}