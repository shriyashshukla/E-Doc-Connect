const mongoose = require('mongoose');

const url = 'mongodb+srv://shriyash:harishukla20@doctor.vmi57la.mongodb.net/E-Doc?retryWrites=true&w=majority';

// asynchronous - return Promise
mongoose.connect(url)
.then((result) => {
    console.log('database connected successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;