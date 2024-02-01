const express = require('express')
require('dotenv').config()
const cors = require('cors')

// config import
const {connectDB} = require('./config/mongoDB')


// Router import
const userRouter = require('./routes/user');
const authRouter = require('./routes/authentication');

// import middleware
const { verifyUser } = require('./middleware/auth')

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());


// router integration
app.use('/api/auth', authRouter);
app.use('/api/', verifyUser,userRouter);

const PORT = process.env.PORT || 4321

app.get('/', (req, res) => {
    return res.send("Welcome to LMS service");
})

connectDB();

app.listen(PORT, () => {
    console.log("App is running at port: ", PORT);
})


/*
    400: bad request
    500: Internal server error
    200: success
*/
