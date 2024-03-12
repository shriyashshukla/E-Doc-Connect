
const { Schema, model } = require('../connection');



const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        
        type: Boolean,
        default: false
    },
    
    created_at: {
        type: Date,
        default: Date.now
    },
     avatar:{
        type: String,
        default: 'default.jpg'
     },

    forgotPasswordtoken: String,
    forgotPasswordtokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
});


const User = model('user', userSchema);

module.exports = User;

