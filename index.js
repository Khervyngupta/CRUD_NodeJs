const express = require ('express')
const mongoose = require('mongoose')
const empRouter = require('./routes/emp')
var app = express()

app.get('/',function(req,res){
    res.send('Hii Khervyn')
})

mongoose.connect('mongodb://127.0.0.1/test');
mongoose.connection.once('open', () => {
    console.log('Database connected successfully.');
}).on('error',function(err){
    console.log('Error ',err)
})

app.use('/emp',empRouter)

app.listen(8000,function(){
    console.log('Server is running at Port 8000');
})