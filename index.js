const express = require('express')
// je require mes config pour pouvoir les utiliser 
require('dotenv').config({path: './config/.env'})
//je previens mon server que j'ai un fichier DB 
require('./config/db');
const app = express()

//j'appelle et définit  mes routes
const userRoutes = require('./routes/user.routes');

//routes
//  lorsqu'il y'a une requete sur /user, alors va voir sur userRoutes (routes en lien avec l'user)
app.use('/api/user', userRoutes)



//server
app.listen( process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`);
})