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
    
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Types.ObjectId, ref: 'Service', required: true },

    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Booking', BookingSchema);