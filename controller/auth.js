const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Login = async(req, res) => {
    try{

        const { phone, password } = req.body;
        const user = await User.findOne({
            phone: phone,
        })
        
        if(!user){
            return res.status(400).json({
                message: 'Invalid user'
            })
        }

        const userPassword = user.password;
        const isMatching = await bcrypt.compare(password, userPassword);
        
        if(!isMatching){
            return res.status(400).json({
                message: 'Phone or password is invalid'
            })
        }
        
        const payloadData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
        }

        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {expiresIn: "24h"})
        
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly:true
        }
        
        user.password = undefined;
        user.token = token;
        return res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user:user,
            message:"User Logged in successfully!"
        })
    }catch(err){
        console.log("Error while login: ", err);
    }
    return res.status(500).json({
        message: 'Internal server error'
    })
}