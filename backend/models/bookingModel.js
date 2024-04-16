const { Schema, model, Types } =  require('../connection');


const BookingSchema = new Schema({
   
    
    date : { type : Date, default : Date.now },

    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    
    //  user: { type: String , required: true },
    // service: { type: String , required: true },

    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Booking', BookingSchema);