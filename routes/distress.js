const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();


const router = require('express').Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//SEND SMS
router.post('/sms', async (req,res)=>{
    const numbers = req.body.numbers
    try {
        numbers.map(async(number, index) => {
            const message = await client.messages
            .create({
                body: `CODE ${req.body.color}, 
${req.body.name} is in distress. 
Battery health: ${req.body.battery},
location: ${req.body.location}`,
                from: '+447862141259',
                to: number
            })
            console.log(message)
        })
        
    }   catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

//SEND SMS TO ONE PERSON
router.post('/sms-single', async (req,res)=>{
    try {
            const message = await client.messages
            .create({
                body: ` 
${req.body.name} is in DISTRESS. 
Battery health: ${req.body.battery},
location: ${req.body.location}`,
                from: '+447862141259',
                to: req.body.number
            })
            console.log(message)
        
    }   catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

//CALL ONE PERSON
router.post('/call-single', async (req,res)=>{
    try {
            const call = await client.calls
            .create({
                twiml: `<Response><Say> 
${req.body.name} is in distress. 
Battery health: ${req.body.battery},
location: ${req.body.location},
</Say></Response>`,
                to: req.body.number,
                from: '+447862141259',
            })
            console.log(call)
        
    }   catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

module.exports = router;
