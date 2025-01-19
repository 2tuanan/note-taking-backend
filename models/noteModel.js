const {Schema, model, Types} = require('mongoose');

const noteSchema = new Schema({
    _id: { 
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId() 
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = model('notes', noteSchema);