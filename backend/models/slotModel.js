const { Schema, model, Types }  = require('../connection');


const slotSchema = new Schema({
    doctor: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    slotDate: {
        type: Date,
        required: true
    },
    slotTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    
});


module.exports = model('Slot', slotSchema);
