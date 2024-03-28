const { model, Schema } = require('../connection');

const mySchema = new Schema({
    
    name : String,      
    price: String,
    description: String,
    image: String,
   

});

module.exports = model( 'service', mySchema );