const mongoose = require('mongoose')
const { DEFAULT_BOOK_CATEGORY } = require('../helper/constants')

const bookModel = new mongoose.Schema({
    bookNumber: {
        type: String,
        default: ''
    },
    bookId:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
        unique: false,
    },
    totalPages: {
        type: Number,
        default: 0,
    },
    imageURL:{
        type: String,
    },
    category: {
        type: String,
        default: DEFAULT_BOOK_CATEGORY,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    donatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    language: {
        type: String,
        default: 'English'
    },
    tags: {
        type: Array,
        default: []
    },
    currentIssued: {
        type: String,
        default: '',
        required: false,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Author',
        required: true,
    },
    publication: {
        type: mongoose.Schema.ObjectId,
        ref: 'Publication',
        required: true,
    },
    addedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    edition: {
        type: String,
        default: ''
    },
},
{
    timestamps: true,
});
bookModel.index({
    name: 'text',
    description: 'text',
    bookNumber: 'text',
    bookId: 'text'
},
{
    unique: false,
})
module.exports = mongoose.model('Book', bookModel);