
const Publication = require('../models/Publication');

exports.createPublication = async(req, res) => {
    try{
        const { name } = req.body;
        if(!name){
            return res.status(400).json({
                message: 'Invalid name',
            })
        }

        const publication = await Publication.create({
            name,
        })

        if(!publication){
            return res.status(400).json({
                message: 'Unable to create publication',
            })
        }
        return res.status(200).json({
            message: 'Publication created successfully',
            publication,
        })
    }catch(err){
        console.log("Error while creating publication: ", err);
    }
    res.status(500).json({
        message: 'Internal server error',
    })
}

exports.getPublication = async(req, res) => {
    try{

        const { id } = req.params;
        if(!id){
            return res.status(400).json({
                message: 'Invalid publication id',
            })
        }

        const publication = await Publication.findById(id);

        if(!publication){
            return res.status(404).json({
                message: 'Publication not found!'
            });
        }

        return res.status(200).json({
            message: 'Publication found',
            publication,
        })

    }catch(err){
        console.log("Error while fethcing publication: ", err);
    }
    res.status(500).json({
        message: 'Internal server error'
    })
}

exports.searchPublication = async(req, res) => {
    try{
        const { query } = req.query;
        if(!query){
            return res.status(400).json({
                message: 'Invalid search query'
            })
        }

        const publications = await Publication.find({$text: {$search: query}}).limit(10);
        res.status(200).json({
            message: 'Publications found!',
            publications,
        })

    }catch(err){
        console.log("Error while searching publication: ", err);
    }
}