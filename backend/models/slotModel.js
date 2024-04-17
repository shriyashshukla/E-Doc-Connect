const { Schema, model, Types }  = require('../connection');


const slotSchema = new Schema({
    doctor: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available'
    },
    booked: {
        type: Boolean,
        default: false
    },

    duration:{
        type: Number,
        required: true
    },
    
    created_at: {
        type: Date,
        default: Date.now
    }
    
});


module.exports = model('Slot', slotSchema);
