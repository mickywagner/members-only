const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        first_name: { type: String, required: true},
        last_name: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
        isMember: { type: Boolean, required: true, default: false},
        isAdmin: { type: Boolean, required: true, default: false},
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
    }
)

UserSchema
    .virtual('full name')
    .get(() => {
        return this.first_name + this.last_name
    })

module.exports = mongoose.model('User', UserSchema)