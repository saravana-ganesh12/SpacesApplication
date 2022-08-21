const express = require('express');
const router = express.Router();
const {Client, auth} = require('twitter-api-sdk');
const axios = require('axios');

const authClient = new auth.OAuth2User({
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
    callback: "http://127.0.0.1:3001/spacesapplication/callback",
    scopes: ['tweet.read','users.read','space.read']
});

const client = new Client(authClient);

const STATE = "my_state";

router.get('/',(req, res)=>{
    res.render('pages/index');
});

//Expose GET Method for getting the token from API
router.get('/speechapi/token', async(req, res, next) => {
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



router.get('/login', async (req, res)=>{
    const authURL = authClient.generateAuthURL({
        state: STATE,
        code_challenge_method: "plain",
        code_challenge: "test"
    });
    res.redirect(authURL);
});

router.get('/callback', async (req, res)=>{
    try{
        const {code, state} = req.query;
        if(state!== STATE){
            return res.status(500).send("State isn't matching");
        }
        await authClient.requestAccessToken(code);
        res.redirect("http://127.0.0.1:3000/search");
    }catch(err){
        console.log(err);
    }
});


router.get('/searchspaces/:query',async(req, res)=>{
    try{
        
        const spacesSearch = await client.spaces.searchSpaces({
            query: req.params.query,
            "state": ["live"],
            "space.fields": ["title"],
            
        });
        res.status(200).send(spacesSearch);
    }catch(err){
        res.status(404).send(err);
        console.log(err);
    }
});
module.exports =router;