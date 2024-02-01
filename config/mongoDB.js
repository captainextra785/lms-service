const mongoose = require('mongoose')

const dbURL = process.env.MONGODB_URL || 'mongodb+srv://captainextra785:2A781B1NUDOz3NOU@lms-1.ybkyf4z.mongodb.net/lms?retryWrites=true&w=majority';
exports.connectDB = () => {
    mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.log("Error in connecting mongodb: ", err);
    })
}