const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

const mongoURI = 'mongodb://localhost:32768'

mongoose
    .connect(
        mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

const Todos = require('./routes/Todos')

app.use('/todos', Todos)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req,res)=>{
        res.sendFile(__dirname + '/public/index.html')
    })
}

app.listen(port, function() {
    console.log('Server is running on port: ' + port)
})
