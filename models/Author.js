const mongoose = require('mongoose')

const authorModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    bio:{
        type: String,
        default: ''
    }
})
authorModel.index({
    name: 'text',
    bio: 'text'
})
module.exports = mongoose.model('Author', authorModel);