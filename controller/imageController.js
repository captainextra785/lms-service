const cloudinary = require('cloudinary').v2;

exports.uploadImage = async(req, res) => {
    try{
        const { type = 'all' } = req.body;
        
        // Generate local path
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        const image = await cloudinary.uploader.upload(dataURI, {
            folder: type,
        })

        if(!image){
            return res.status(500).json({
                message: 'Unable to upload image',
            })
        }

        return res.status(200).json({
            message: 'Image uploaded!',
            image: image.secure_url
        })
    }catch(err){
        console.log("Error while uploading image: ", err);
    }
    res.status(500).json({
        message: "Internal server error"
    })
}