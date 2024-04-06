const { Schema, model, Types }  = require('../connection');


const appointmentSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('Appointment', appointmentSchema);
