const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.verifyUser = async (req, res, next) => {
    try{
        
        const token = req.headers.authorization?.replace("Bearer ","") || null;
        if(!token){
            return res.status(201).json({
                success:false,
                message:"Please login again!"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);

        if(!user){
            return res.status(201).json({
                success:false,
                message:"Please login again!"
            })
        }

        req.user = user;
        return next();
    }catch(err){
        console.log("Error while authenticating user: ", err);
    }
    return res.status(201).json({
        success:false,
        message:"Please login again!"
    })
}