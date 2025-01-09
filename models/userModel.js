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
        required: true,
        select: false
    },
    image: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
    noteList: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }
}, {timestamps: true});
module.exports = model('users', userSchema);