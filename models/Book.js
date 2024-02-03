const mongoose = require('mongoose')

const bookModel = new mongoose.Schema({
    isbn: {
        type: String,
        default: ''
    },
    name:{
        type: String,
        required: true,
        unique: true,
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
        default: 'ALL'
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    edition: {
        type: String,
        default: ''
    }
});
bookModel.index({
    name: 'text',
    language: 'text',
    category: 'text',
})
module.exports = mongoose.model('Book', bookModel);