// Les models nous permettent de voir a quoi va ressembler la BDD de l'user, ce que l'ont doit recevoir etc.
const mongoose = require('mongoose');
//fonction de validatore qui va controler les caractère requis pour une adresse mail
const {isEmail} = require ('validator');

const bcrypt = require('bcrypt');

// ici on déclare tous ce qui va être dans notre schéma d'user
const userSchema = new mongoose.Schema( 
    {
         pseudo: {
             type: String,
             required: true,
             minLength: 3,
             maxLenght: 55,
             unique: true, 
             trimp: true
         },

         email: {
            type: String, 
            required: true,
            validate: [isEmail] ,
            lowercase: true,
            trim: true, 
         },

         password: {
             type: String, 
             required: true,
             max: 1024,
             minLength: 6
         },

         picture: {
             type:String, 
             default: "./upload/profil/random-user.png"
         },
         
         bio: {
             type: String,
             max: 1024,
         },

         followers: {
             type: [String]
         },

         following: {
             type: [String]
         },

         like: {
             type: [String]
         }
    },
    {
        timestamps: true,
    }
);

// je déclare une function avec la méthode 'pre' qui me permettra de crypter le mot de passe avant de l'enregistrer 
//on ne fait pas de fonction fleché pour ensuite pouvoir utiliser le "this"
userSchema.pre("save", async function(next) {
    //bcrypt nous genère une série de caractère pour "salé" le mot de passe 
    
    const salt = await bcrypt.genSalt();
    // on l'ajoute à notre mdp
    // on utilisé la méthode hash 
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
});

//
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel