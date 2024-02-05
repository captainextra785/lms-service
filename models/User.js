const mongoose = require('mongoose')

const { TYPE_USER, TYPE_SUPER_ADMIN, TYPE_MANAGER } = require('../helper/constants')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        enum: ['Male', 'Female']
    },
    role: {
        type: String,
        default: TYPE_USER,
        enum: [TYPE_USER, TYPE_SUPER_ADMIN, TYPE_MANAGER]
    },
    password:{
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    dob:{
        type: Date,
        required: true,
    },
    address:{
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    aadhar: {
        type: String,
        unique: true,
    },
    profileURL:{
        type: String,
    },
    bookDonated: {
        type: Array,
        default: []
    },
    bookIssued: {
        type: Array,
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('User', userSchema);