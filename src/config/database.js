const mongoose = require('mongoose');
// const app = require('../express/app');
require('dotenv').config();

const connect = () =>{
    mongoose.connect(process.env.DB_URL)
    .then(res => console.log(`connected, result : ${res}`))
    .catch(console.log)
}
module.exports = connect;
