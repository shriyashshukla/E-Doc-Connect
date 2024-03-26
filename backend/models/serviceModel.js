const { Schema, model } = require('../connection');

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true
  }
});

// Create the Service model using the schema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
