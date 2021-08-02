const jwt = require ('jsonwebtoken');
const UserModel = require('../models/user.model');

// Test si l'user est connecté (on check le token a chaque page)
// important de next car c'est un middleware
module.exports.checkUser = (req, res, next) => {
    //req.cookies = mon cookies jwt 
    const token = req.cookies.jwt;
    // si on a un token alors on va le verifier
    if (token) {
        //on lui donne notre token et notre token secret 
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
            } else {
                let user = await UserModel.findById(decodedToken);
                res.locals.user = user;
                console.log(user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}