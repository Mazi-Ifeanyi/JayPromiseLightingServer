const mongoose = require('mongoose');

const isConnected = () =>{
    try{
        mongoose.connect('mongodb://127.0.0.1/jaypromise_db');
        return true;
    }catch(err){
        console.log('An error occured while trying to establish connection.',err)
    }
    return false;
}

mongoose.connection.on('error',err=>{
    console.log('An error occured')
})
mongoose.connection.on('disconnected',err=>{
    console.log('Mongoose disconnected from mongoserver=>', err);
});

module.exports = {
    isConnected
}