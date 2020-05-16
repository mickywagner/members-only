const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        title: { type: String, required: true },
        timestamp: { type: Date, required: true},
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
        text: { type: String, required: true}
    }
)

module.exports = mongoose.exports('Message', MessageSchema)