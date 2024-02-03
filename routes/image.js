const { Router } = require('express')
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

const fileSizeErrorHandler = (err, req, res, next) => {
    if(err){
        return res.status(400).json({
            message: 'File size is more than 2MB',
        })
    }
    return next();
}

const imageRouter = Router();
const imageController = require('../controller/imageController');

imageRouter.post('/', upload.single('image'), fileSizeErrorHandler, imageController.uploadImage);

module.exports = imageRouter;

