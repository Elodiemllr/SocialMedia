const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find ((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
      });
    
      try {
        const post = await newPost.save();
        return res.status(201).json(post);
      } catch (err) {
        return res.status(400).send(err);
      }
    };

    module.exports.updatePost = (req, res) => {
    //on verifie si l'id est ok  / verifie l'id qu'on passe en params  
// si il est pas ok je fais un return 
if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    //sinon j'enregistrement la MAJ
    const updatedRecord = {
        message: req.body.message,
    };
    // on passe notre uptdate au postmodel 
    PostModel.findByIdAndUpdate(
    //on trouve l'id dans l'url 
    req.params.id,
    //$set car on fait à jour 
    {$set: updatedRecord},
    {new: true},
    (err, docs) => {
        // si on a pas d'erreur on envoie les infos
        if (!err) res.send(docs);
        //sinon on passe l'erreur 
        else console.log("Update error : " + err);
    }
    );
};

module.exports.detelePost = (req, res) => {
    //on verifie si l'id est ok  / verifie l'id qu'on passe en params  
// si il est pas ok je fais un return 
if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndDelete(
        //l'id de l'article qu'on veut supprimer
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err)
        }
    )
};