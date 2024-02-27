
const { Schema, model } = require('../connection');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


const User = model('user', userSchema);

module.exports = User;

