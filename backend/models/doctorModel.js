const { Schema, model } = require('../connection');


const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    availableDays: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    avatar:{
        type: String,
        default: 'default.jpg'
     },

});


const Doctor = model('Doctor', doctorSchema);

module.exports = Doctor;
