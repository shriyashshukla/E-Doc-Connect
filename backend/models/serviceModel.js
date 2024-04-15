const { model, Schema } = require('../connection');

const mySchema = new Schema({
   
    price: String,
    time: String,
    date: String,
    duration : String,
    createdAt: Date
});

module.exports = model('service', mySchema);