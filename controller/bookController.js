
const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try{
        
        const { isbn, name, totalPages, imageURL, description, price,
            donatedBy, language, tags, author, publication, edition,
            category
        } = req.body;
        
        const payload = {
            isbn, name, totalPages, imageURL, description, price, donatedBy,
            language, tags, author, publication, edition, category, addedBy: req.user.id,
        }

        const book = await Book.create(payload);
        if(!book){
            return res.status(400).json({
                message: 'Unable to create book',
            })
        }

        return res.status(200).json({
            message: 'Book created successfully',
            book,
        })

    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({
                message: 'Invalid book information'
            })
        }
        console.log("Error while creating book: ", err);
    }
    res.status(500).json({
        message: 'Internal server error',
    })
}

exports.getBook = async(req, res) => {
    try{

        const { id } = req.params;
        
        if(!id){
            return res.status(400).json({
                message: 'Invalid book id'
            })
        }

        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({
                message: 'Book not found!'
            })
        }

        return res.status(200).json({
            message: 'Book found!',
            book,
        })

    }catch(err){    
        console.log("Error while fetching books: ", err);
    }

    res.status(500).json({
        message: 'Internal server error',
    })
}


exports.searchBook = async(req, res) => {
    try{

        let { query = '' } = req.query;
        const { filters  = []} = req.body;
        
        let searchQuery = query ? {$text : {$search: query}} : {};

        const filterQuery = filters.reduce((acc, filter) => {
            return {
                ...acc,
                [filter.key]: filter.value,
            }
        }, {})
        
        searchQuery = {
            ...searchQuery, 
            ...filterQuery
        }
        const books = await Book.find({
            ...searchQuery
        })

        return res.status(200).json({
            message: 'Book Found!',
            books
        })
    }catch(err){
        console.log("Error while searching books: ", err);
    }
    return res.status(500).json({
        message: 'Internal server error'
    })
}