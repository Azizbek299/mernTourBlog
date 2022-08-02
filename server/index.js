const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const tourRouter = require('./routes/tourRoute');
const dotenv = require('dotenv');
dotenv.config()




const corsOptions ={
     origin:true,  
     credentials:true,
     methods: 'GET, POST, PUT, DELETE',
     optionSuccessStatus:200,
}
	


const port = process.env.PORT || 5000
const app = express()




app.use(morgan('dev'))
app.use(express.json({limit:'30mb', extended:true}))
app.use(express.urlencoded({limit:'30mb', extended:true}))
app.use(cors(corsOptions))






mongoose.connect(process.env.MONGODB_URL)  
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port} and connect to MongoDB`) 
    })
})
.catch((err) => {
    console.error('MongoDB ga ulanishda hato yuz berdi', err);
})
   

app.use('/users', userRouter)  //  http://localhost:5000/users/signup
app.use('/tour', tourRouter)
app.get('/', (req, res) => {                                //  Deploy килаетган пайтда кушиб куямиз
    res.send('Welcome to tour API')
})