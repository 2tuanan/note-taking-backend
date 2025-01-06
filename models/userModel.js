const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    }
})
module.exports = model('users', userSchema);