// Les models nous permettent de voir a quoi va ressembler la BDD de l'user, ce que l'ont doit recevoir etc.
const mongoose = require("mongoose");
//fonction de validatore qui va controler les caractère requis pour une adresse mail
const { isEmail } = require("validator");

const bcrypt = require("bcrypt");

// ici on déclare tous ce qui va être dans notre schéma d'user
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLenght: 55,
            unique: true,
            trimp: true,
        },

        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6,
        },

        picture: {
            type: String,
            default: "./upload/profil/random-user.png",
        },

        bio: {
            type: String,
            max: 1024,
        },

        followers: {
            type: [String],
        },

        following: {
            type: [String],
        },

        likes: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// je déclare une function avec la méthode 'pre' qui me permettra de crypter le mot de passe avant de l'enregistrer
//on ne fait pas de fonction fleché pour ensuite pouvoir utiliser le "this"
userSchema.pre("save", async function (next) {
    //bcrypt nous genère une série de caractère pour "salé" le mot de passe
    const salt = await bcrypt.genSalt();
    // on l'ajoute à notre mdp
    // on utilisé la méthode hash
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// lorsqu'on va essayer de se loguer, on recup l'email et le password
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        //bcrypt  compare les deux cryptage
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

//
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
