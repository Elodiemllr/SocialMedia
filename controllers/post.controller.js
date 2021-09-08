const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utils/errors.utils");
const fileSystem = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
        //Je trie mes posts du plus récent au plus anciens
    }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
    //on traite le file
    let fileName;
    //ici on traite "si" une image est envoyé (car un post peut contenir seulement du texte aussi)
    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file");
            //le throw arrête le try pour directement passer au catch
            //ici on exige une taille en dessous de 500ko
            if (req.file.size > 50000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
        // ici le fileName l'id de l'user +6 le moment pile ou il l'envoie (du coup nom unique)
        fileName = req.body.posterId + Date.now() + ".jpg";
        //cette function permet de creer via file stysteme le fichier
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        // si req.file n'est pas null alors on le passe sinon on met rien
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
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
        { $set: updatedRecord },
        { new: true },
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
            else console.log("Delete error : " + err);
        }
    );
};

module.exports.likePost = async (req, res) => {
    //on verifie si l'id est ok  / verifie l'id qu'on passe en params
    // si il est pas ok je fais un return
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        // on recup le message avec l'id du message
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                // on lui transmet l'id de la personne qui a liké
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    //on verifie si l'id est ok  / verifie l'id qu'on passe en params
    // si il est pas ok je fais un return
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        // on recup le message avec l'id du message
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                // on lui transmet l'id de la personne qui a liké
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
    //on verifie l'id
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        //on recup l'id du post et on update le tableau de commentaire
        return PostModel.findByIdAndUpdate(
            //on recup l'id passé en params
            req.params.id,
            {
                //on envoie l'id du commentaire, le pseudo, le text et la date
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

//editer un commentaire
module.exports.editComment = (req, res) => {
    //verificationd e l'if
    // si il est pas ok je fais un return
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        //tu cherche l'id
        return PostModel.findById(
            req.params.id,
            // soit tu renvoie la docs soit erreur
            (err, docs) => {
                //on pointe l'array "commentaire" pour trouver le commentaire qui correspond
                const theComment = docs.comments.find((comment) =>
                    //on utilise la méthode equals pour dire que l'id du commentaire correspond et il (thecomment) doit correspondre au commentaire à editer
                    comment._id.equals(req.body.commentId)
                );
                if (!theComment)
                    return res.status(404).send("comment not found");
                theComment.text = req.body.text;

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err);
                });
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.deleteComment = (req, res) => {
    //verificationd e l'if
    // si il est pas ok je fais un return
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        // on update et on delete pas pour ne pas supprimer le post entier mais seulement le commentaire
        return PostModel.findByIdAndUpdate(
            // on pointe le commentaire et on le pull
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};
