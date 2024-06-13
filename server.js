const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const dataBaseConnect = require('./config/db');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

dotenv.config();

const app = express();

const serverPORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

dataBaseConnect()

app.use('/api', userRouter);
app.use('/api', postRouter);

// app.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "check",

//     })
// })

app.listen(serverPORT, () => {
    console.log(`server is running in ${serverPORT}`)
})



