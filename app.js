require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter')
mongoose.set('strictQuery', true)


//middleware
app.use(express.json())

//routes
app.use('/api/v1/tasks', taskRouter)

//error route
app.use((req,res) => {
    res.status(404).json({ msg: "route not found"})
})
//db Connection
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
        
    }
    }
    startServer()