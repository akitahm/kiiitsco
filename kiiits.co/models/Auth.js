const mongoose = require('mongoose')


const authSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const auth = mongoose.model('auth', authSchema)

module.exports = auth