const Author = require('../models/Author');

exports.createAuthor = async(req, res) => {
    try{

        const { name, bio } = req.body;
        const author = await Author.create({
            name,
            bio,
        });

        if(!author){
            return res.status(403).json({
                message: 'Unable to create author',
            })
        }

        return res.status(200).json({
            message: 'Author created successfully',
            author,
        })

    }catch(err){
        console.log("Error while creating author: ", err);
    }
    res.status(500).json({
        message: 'Internal server error',
    })
}

exports.getAuthor = async(req, res) => {
    try{

        const { id } = req.params;

        if(!id){
            return res.status(404).json({
                message: 'Invalid author id',
            })
        }

        const author = await Author.findById(id);
        if(!author){
            return res.status(404).json({
                message: 'Author not found!',
            })
        }

        return res.status(200).json({
            message: 'Author found!',
            author,
        })

    }catch(err){
        console.log("Error while fetching author: ", err);
    }
    res.status(500).json({
        message: 'Internal server error'
    })
}

exports.searchAuthor = async(req, res) => {
    try{

        const { query = '' } = req.query;
        const authors = await Author.find({$text: {$search: query}}).limit(10);
        return res.status(200).json({
            message: 'Author found',
            authors,
        })
    }catch(err){
        console.log("Error while searching author: ", err);
    }
    res.status(500).json({
        message: 'Internal server error'
    })
}