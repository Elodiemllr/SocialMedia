// pour mon crud concernant l'user
const ObjectID = require('mongoose').Types.ObjectId;
const UserModel = require('../models/user.model');

// recup tout les users avec la méthode get sur http://localhost:5000/api/user/
module.exports.getAllUsers = async (req, res) => {
  // on va chercher la table des users et on prends tout
  // on va egalement demander lors de notre select de ne jamais renvoyer le password
  const users = await UserModel.find().select('-password');
  // si tout fonctionne on response les users en json
  res.status(200).json(users);
};

// recup seulement 1 user
module.exports.userInfo = async (req, res) => {
  //
  console.log(req.params);
  // si l'id n'est pas connu dans notre bdd alors on retourne une erreur 400
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknow :${req.params.id}`);
  }
  // sinon on va chercher l'utilisateur par l'id
  UserModel.findById(req.params.id, (err, docs) => {
    // si ça fonctionne on r'envoie les infos
    if (!err) res.send(docs);
    // sinon on log l'erreur
    else console.log(`Id unknow : ${err}`);
    // on oublie pas d'enlever le mdp
  }).select('-password');
};

// modifier user
module.exports.updateUser = async (req, res) => {
  // si l'id n'est pas connu dans notre bdd alors on retourne une erreur 400
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send(`ID unknow :${req.params.id}`)
  // si on trouve l'id on trouve l'user et on  update 
  try {
    await UserModel.findOneAndUpdate(
      //req.params.id = on passe l'id de l'user dans l'url 
      {_id: req.params.id},
      { //on envoie la bio (qui va se créer)
        $set : {
          bio: req.body.bio
        }
      },
      //params à mettre obligatoirement  lorsqu'on fait un put 
      {new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        //si il n'ya pas d'erreur alors on r'envoie les infos
        if (!err) return res.send(docs);
        //sinon on fait un status 500 et on envoie l'erreur
        if (err) return res.status(500).send({message: err});
      }
    )
  } catch (err) {
    return res.status(500).json({message: err});
  }
};

//supprimer un user 
module.exports.deleteUser = async (req, res) => {
   // si l'id n'est pas connu dans notre bdd alors on retourne une erreur 400
   if (!ObjectID.isValid(req.params.id)) 
   return res.status(400).send(`ID unknow :${req.params.id}`)
 // si on trouve l'id on trouve l'user et le delete 
  try {
    await UserModel.remove(
      {_id: req.params.id}).exec();
      res.status(200).json({message: "Succesfully deleted."});

  } catch (err) {
    return res.status(500).json({message: err});
  }
};