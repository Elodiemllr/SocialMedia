// Je require mongoose (bibliothèque) qui me permet de travailler avec mongoDB (methodes etc)
const mongoose = require("mongoose");

//je le connect a mon compass
mongoose
    .connect(
        // Je protege mes données en renseignent mes informations présente dans .env et non directement le mdp et l'user
        "mongodb+srv://" +
            process.env.DB_USER_PASS +
            "@cluster0.inrvb.mongodb.net/test?authSource=admin&replicaSet=atlas-zogtx5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
        //j'entre des informations de base
        {
            userNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    // Puis si ça réussin alors j'affiche un message de succès dans ma console
    .then(() => console.log("Connected to MongoDB"))
    //Si ça ne fonctionne pas, j'affiche l'erreur dans ma console
    .catch((err) => console.log("Failed to connect to MongoDB", err));
