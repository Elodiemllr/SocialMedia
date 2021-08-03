//besoin pour incrémenter le lien de l'img
const UserModel = require("../models/user.model");
// pour incrementer des elements dans des fichiers
const fileSystem = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfilPicture = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        )
            throw Error("invalid file");
        //le throw arrête le try pour directement passer au catch
        //ici on exige une taille en dessous de 500ko
        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json(errors);
    }
    // ici le fileName sera le nom de l'image + .jpg (on remet l'image en jpg). chaque photo sera unique et la nouvelle viendra ecrasé l'ancienne pour eviter le sur stockage
    const fileName = req.body.name + ".jpg";
    //cette function permet de creer via file stysteme le fichier
    await pipeline(
        req.file.stream,
        fileSystem.createWriteStream(
            //ici le chemin ou on stock
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
