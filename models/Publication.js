const mongoose = require('mongoose');

const publicationModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
})
publicationModel.index({
    name: 'text'
})
module.exports = mongoose.model('Publication', publicationModel);