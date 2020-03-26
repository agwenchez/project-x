const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose= require('mongoose');
// const db = require('./config/keys').MongoURI;
const path = require('path');

app.use(express.json({ extended:false}));

mongoose.connect("mongodb://localhost:27017/mpesa",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=>console.log("MongoDB connected"))
    .catch(err => console.log(err));

// set static folder
 app.use(express.static(path.join(__dirname, 'public')));

 //serve routes

 app.use('/users', require('./routes/users'));
 app.use('/mpesa', require('./routes/mpesa'));

 app.listen(PORT, ()=>console.log(`App listening on PORT ${PORT}`))