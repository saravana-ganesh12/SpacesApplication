//Required Packages
require('dotenv').config({path: '.env'});
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const app = express();
const spacesRoute= require('./routes/spacesRoute');

//Express App Usage
app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);
app.use(cors());

//Express App Settings
app.set('view engine', 'ejs');


app.use('/spacesapplication', spacesRoute);
//Make Express App live
app.listen(3001, ()=>{
    console.log('Server is Live on port 3001');
});