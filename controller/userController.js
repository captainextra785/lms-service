const bcrypt = require('bcrypt')
const User = require("../models/User")

const {
    TYPE_MANAGER, TYPE_SUPER_ADMIN, TYPE_USER
} = require('../helper/constants');

exports.createUser = async (req, res) => {

    try{

        const { 
            firstName, lastName='', gender, email='', phone,role, dob, address='',
            city, state, country, pin, aadhar='',profileURL='',createdBy
        } = req.body;

        const creatorUser = req.user;
        if(!creatorUser || creatorUser.role === TYPE_USER || (role && role === TYPE_SUPER_ADMIN)){
            return res.status(400).json({
                message: !creatorUser ? "No operator found" : "Operator doesn't have permission",
            })
        }

        if(role === TYPE_MANAGER && creatorUser.role !== TYPE_SUPER_ADMIN){
            return res.status(400).json({
                message: "Only super admin can create manager"
            })
        }
        
        const password = await bcrypt.hash('admin', 10);
        if(!password){
            return res.status(500).json({
                message: 'Internal server error',
            })   
        }

        const user = await User.create({
            firstName,lastName,email,phone, gender, password,role,dob,address,
            city,state,country,pin,aadhar,profileURL,createdBy,
        })
        
        return res.status(200).json({
            message: 'User created',
            user: user
        })
    }catch(err){
        console.log("Error while creating user: ", err);
    }
    return res.status(500).json({
        message: 'Internal server error',
    })
}

exports.getUsers = async(req, res) => {

    try{

        const users = await User.find();
        
        return res.status(200).json({
            message: 'User found',
            users,
        })

    }catch(err){
        console.log("Error while fetching users data: ", err);
    }
    res.status(500).json({
        message: 'Internal server error',
    })
}

exports.getUser = async (req, res) => {
    try{
        const {creatorInfo = false} = req.query;
        const userId = req.params.id || '';

        let user = null;
        if(creatorInfo){
            user = await User.findById(userId).populate('createdBy');
        }else{
            user = await User.findById(userId);
        }

        if(!user){
            return res.status(404).json({
                message: 'User not found!',
            })
        }

        return res.status(200).json({
            user: user,
            message: 'User found!'
        })
    }catch(err){
        console.log("Error while fetching user: ", err);
    }
    return res.status(500).json({
        message: 'Internal server error'
    })
}