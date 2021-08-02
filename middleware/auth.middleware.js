const jwt = require ('jsonwebtoken');
//on a besoin du model pour controler l'id etc.
const UserModel = require('../models/user.model');

// Function pour Test si l'user est connecté (on check le token a chaque page)
// important de next car c'est un middleware
module.exports.checkUser = (req, res, next) => {
    //req.cookies = mon cookies jwt 
    const token = req.cookies.jwt;
    // si on a un token alors on va le verifier
    if (token) {
        //on lui donne notre token et notre token secret 
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            //si il y'a une erreur on lui enlève le cookie 
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

//pour la première identification
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
                //on ne next pas car on n'arrête tout vu qu'il y'a une erreur 
            } else {
                console.log (decodedToken.id);
                next();
            }
        });
    } else {
        console.log('Don\'t have a token')
    }
}