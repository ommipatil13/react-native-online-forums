const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add title']
    },
    description: {
        type: String,
        required: [true, 'please add description']
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)