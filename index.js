const express = require('express')
//j'appelle et définit  mes routes
const userRoutes = require('./routes/user.routes');
// je require mes config pour pouvoir les utiliser 
require('dotenv').config({path: './config/.env'})
//je previens mon server que j'ai un fichier DB 
require('./config/db');
const app = express();


//pour traiter la data qui va transiter et la  mettre au bon format
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//routes
//  lorsqu'il y'a une requete sur /user, alors va voir sur userRoutes (routes en lien avec l'user)
app.use('/api/user', userRoutes)



//server
app.listen( process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`);
})