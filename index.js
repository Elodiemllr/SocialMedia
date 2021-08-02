const express = require('express')
const cookieParser = require('cookie-parser');
//j'appelle et définit  mes routes
const userRoutes = require('./routes/user.routes');
// je require mes config pour pouvoir les utiliser 
require('dotenv').config({path: './config/.env'})
//je previens mon server que j'ai un fichier DB 
require('./config/db');
const {checkUser} = require('./middleware/auth.middleware');
const app = express();


//pour traiter la data de la requete qui va transiter et la  mettre au bon format (body-parser maintenant integrer à express)
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
//routes
//  lorsqu'il y'a une requete sur /user, alors va voir sur userRoutes (routes en lien avec l'user)
app.use('/api/user', userRoutes)

//jwt 
// a chaque requete on verifie notre user 
app.get('*', checkUser);

//server
app.listen( process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`);
})