//Required Packages
require('dotenv').config({path: '.env'});
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const app = express();

//Express App Usage
app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);
app.use(cors());
app.use('/assets/js', express.static(__dirname+'/assets/js'));

//Express App Settings
app.set('view engine', 'ejs');

//Expose GET Method for getting the token from API
app.get('/speechapi/token', async(req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const KEY = process.env.KEY;
    const REGION = process.env.REGION;
    if(!KEY || !REGION){
        res.status(400).set('Unable to provide access token due to missing credentials for API');
    }
    else{
        const headers = {
            headers:{
               'Ocp-Apim-Subscription-Key': KEY,
               'Content-Type': 'application/json'
            }
        };
        try{
            const response = await axios.post(`https://${REGION}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`,null, headers);
            res.status(200).send({token: response.data, region: REGION});
        }catch(err){
            res.status(401).send('Error Caught on Authorizing the API');
        }
    }
});


//Make Express App live
app.listen(3001, ()=>{
    console.log('Server is Live on port 3001');
});