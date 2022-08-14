const express = require('express');
const router = express.Router();
const {Client, auth} = require('twitter-api-sdk');

const authClient = new auth.OAuth2User({
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
    callback: "http://127.0.0.1:3001/spacesApplication/callback",
    scopes: ['tweet.read','users.read','space.read']
});

const client = new Client(authClient);

const STATE = "my_state";
router.get('/',(req, res)=>{
    res.render('pages/index');
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
        res.redirect("http://127.0.0.1:3000");
    }catch(err){
        console.log(err);
    }
});
router.get('/searchspaces',async(req, res)=>{
    try{
        const spacesSearch = await client.spaces.searchSpaces({
            query:"games",
            "space.fields": ["title","host_ids"]
        });
        res.status(200).send(spacesSearch);
    }catch(err){
        res.send("Access Token is Required");
        console.log(err);
    }
});
module.exports =router;