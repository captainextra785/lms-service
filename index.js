require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParse = require('cookie-parser');

// config import
const {connectDB} = require('./config/mongoDB')
const { configureCloudinary } = require('./config/cloudinary');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParse());


// Route integration
const rootRouter = require('./routes/index');
app.use('/api', rootRouter);

const PORT = process.env.PORT || 4321

app.get('/', (req, res) => {
    return res.send("Welcome to LMS service");
})

connectDB();
configureCloudinary();

app.listen(PORT, () => {
    console.log("App is running at port: ", PORT);
})
