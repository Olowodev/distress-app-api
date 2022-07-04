const CryptoJS = require('crypto-js');
const User = require('../models/User');

const router = require('express').Router();


//UPDATE
router.put('/:id',  async (req,res)=>{

    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        const {password, ...others} = updateUser._doc
        console.log(...others)
        res.status(200).json({...others});
    }   catch (err) {
        res.status(500).json(err);
        console.log(err)
    }


});

module.exports = router;
