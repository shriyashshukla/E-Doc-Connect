const { Schema, model, Types } =  require('../connection');


const BookingSchema = new Schema({
   
    time: {
        type: String,
        required: true
    },

    date: { 
        type: Date,
        default: () => new Date().toLocaleDateString()
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    
    user: { type: Types.ObjectId, ref: 'user', required: true },
    service: { type: Types.ObjectId, ref: 'service', required: true },

    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Booking', BookingSchema);