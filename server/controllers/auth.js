const User = require("../models/User");
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const { validationResult } = require("express-validator");

// post route @signUp
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "Not able to save User in DB" });
        }
        res.status(200).json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

//post router @signin
exports.signin = (req, res) => {
    const {email , password} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email},(err,user)=>{
        if(!user || err){
            return res.status(400).json({error: "User does not exist"})
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email or Password do not match"
            })
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        //Put toke in cookie
        res.cookie("token",token,{expire  :new Date()+9999})
        
        const {_id,name,email,role} = user;
        res.json({token,user:{_id,name,email,role}})
    })

};

//get router @signout
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Logged Out"
    })
};


//protected routes

exports.isSignedIn =expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
})

//custom middleware

exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error  : "ACCESS DENIED, You are not admin"
        })
    }
    next()
}