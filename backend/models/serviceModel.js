const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name: String,
    price: String,
    description: String,
    image: String,
    createdAt: Date
});

module.exports = model('service', mySchema);