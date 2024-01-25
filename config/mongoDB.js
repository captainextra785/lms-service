const mongoose = require('mongoose')

const dbURL = process.env.MONGODB_URL;

exports.connectDB = () => {
    mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.log("Error in connecting mongodb: ", err);
    })
}