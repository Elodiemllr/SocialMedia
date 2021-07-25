const express = require('express')
// je require mes config pour pouvoir les utiliser 
require('dotenv').config({path: './config/.env'})

//je previens mon server que j'ai un fichier DB 
require('./config/db');

const app = express()

app.listen( process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`);
})