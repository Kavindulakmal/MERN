const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host ='127.0.0.1';
const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'URI'

const connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('Connected to mono db');
    }
    catch(error){
        console.log('Error connecting to Mongo db');
    }
};

connect();

const server = app.listen(port,host,() => {
    console.log(`Server listening on ${server.address().port}`);
}); 


app.use('/api',router);