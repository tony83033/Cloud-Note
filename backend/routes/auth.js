const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
router.post ('/sign',
[body('email',"Enter a valid Email ").isEmail(),
body('password', 'Password must be more then 5 char').isLength({min: 5})


], async (req,res)=>{
    const JWT_SECRET="WEAREHACKERSTO";
    if(req.method=='POST'){

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

        let user  = await User.findOne({email:req.body.email});
        if(user){
           return res.status(200).json({msg:"Sorry! this Email already exiest"});
        }
        // Encrypting User password
        var encPass = CryptoJS.AES.encrypt(req.body.password, "fromthemackersofhackerstower").toString();

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encPass,
        });

        const data ={
            user:{
                id: user.id,
                email:user.email
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        return res.status(200).json({authtoken:authtoken});
    }else{
       return res.json({message:"You can not access this api"});
    }
});

router.post('/login', [
    body('email','Enter a valid Email').isEmail(),
    body('password','Pls Enter password').exists()

], async (req,res)=>{

    const {email,password} = req.body;
    const JWT_SECRET="WEAREHACKERSTO";
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(200).json({error:"Invalid Credentials"})
        }else{
            // Decrypt password
           
            var bytes  = CryptoJS.AES.decrypt(user.password, 'fromthemackersofhackerstower');
            var originalPass = bytes.toString(CryptoJS.enc.Utf8);
           
            if(password==originalPass){
                // CREATING JWT TOKEN
               
                const data ={
                    user:{
                        id: user.id,
                        email:user.email
                    }
                }
            try {
                const auhtoken = jwt.sign(data,JWT_SECRET);
                return res.status(200).json({authtoken:auhtoken})
            } catch (error) {
                
                return res.status(500).json({error:"Internal Server Error pls try after some time"});
            }
              //  const authtoken = jwt.sign(data,JWT_SECRET);
                
                
                
            }else{
                return res.status(200).json({error:"Invalid Credentials"});
            }
        }
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error pls try after some time"});
    }


});

router.post('/getuser', fetchuser, async (req,res)=>{
    try {
       const userId = req.user.id;
       const user  = await User.findById(userId).select("-password");
       res.status(200).json(user);

    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
})



module.exports = router;

