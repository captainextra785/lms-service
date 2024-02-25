const mongoose = require('mongoose')
const { DEFAULT_BOOK_CATEGORY } = require('../helper/constants')

const bookNumberModel = new mongoose.Schema({
    category:{
        type: String,
        default: DEFAULT_BOOK_CATEGORY,
        unique: true,
    },
    count:{
        type: Number,
        default: ''
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('BookNumber', bookNumberModel);