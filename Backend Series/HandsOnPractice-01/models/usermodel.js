const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    imageurl: String
})

module.exports = mongoose.model('User', userSchema);
