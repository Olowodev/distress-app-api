const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();


const router = require('express').Router();

//REGISTER
router.post('/register', async (req,res)=>{
    const newUser = new User({
        fullname: req.body.fullname,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        profileImg: req.body.profileImg,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        closeContacts: req.body.closeContacts
    })

    try {
        const savedUser = await newUser.save();
        const {password, ...others} = savedUser._doc
        res.status(201).json({...others});
    }   catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post('/login', async (req,res)=> {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) { 
            return res.status(401).json("Wrong credentials!");
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(OriginalPassword !== req.body.password) { 
            return res.status(401).json("Wrong credentials!");
        }

        const { password, ...others } = user._doc;
        res.status(200).json({...others});
    }   catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;