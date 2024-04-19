const { Schema, model, Types }  = require('../connection');


const appointmentSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctor: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    slot: {
        type: Types.ObjectId,   
        ref: 'Slot',
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
