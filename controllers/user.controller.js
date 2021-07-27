//pour mon crud concernant l'user
const UserModel = require ('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


//recup tout les users avec la méthode get sur http://localhost:5000/api/user/
module.exports.getAllUsers = async (req, res) => {
    // on va chercher la table des users et on prends tout 
    //on va egalement demander lors de notre select de ne jamais renvoyer le password
    const users = await UserModel.find().select('-password');
    //si tout fonctionne on response les users en json
    res.status(200).json(users);

}


//recup seulement 1 user 
module.exports.userInfo = async (req, res) => {
// 
console.log(req.params);
//si l'id n'est pas connu dans notre bdd alors on retourne une erreur 400
if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow :' + req.params.id)
//sinon on va chercher l'utilisateur par l'id 
UserModel.findById(req.params.id, (err, docs) => {
    // si ça fonctionne on r'envoie les infos 
    if(!err) res.send(docs);
    //sinon on log l'erreur 
    else console.log('Id unknow : ' + err)
    //on oublie pas d'enlever le mdp
}).select('-password');
}