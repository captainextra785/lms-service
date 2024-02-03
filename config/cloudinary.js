const cloudinary  = require('cloudinary').v2;
require('dotenv').config();

exports.configureCloudinary = async() => {
    try{
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary configured");
    }catch(err){
        console.log("Errro while configuring cloudinary: ", err);
    }
}