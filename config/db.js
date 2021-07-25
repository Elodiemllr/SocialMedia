// Je require mongoose (bibliothèque) qui me permet de travailler avec mongoDB (methodes etc)
const mongoose = require("mongoose");

//je le connect a mon compass 
mongoose
.connect('mongodb+srv://socialmedia:SocialMedia21@cluster0.rqtyg.mongodb.net/socialmedia',
//j'entre des informations de base 
{
    userNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}
)
// Puis si ça réussin alors j'affiche un message de succès dans ma console 
.then (() => console.log('Connected to MongoDB'))
//Si ça ne fonctionne pas, j'affiche l'erreur dans ma console 
.catch ((err) => console.log('Failde to connect to MongoDB', err));