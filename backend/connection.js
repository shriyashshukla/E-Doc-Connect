import mongoose, { connect } from 'mongoose';

const url = 'mongodb+srv://shriyash:harishukla20@doctor.vmi57la.mongodb.net/';

// asynchronous - return Promise
connect(url)
.then((result) => {
    console.log('database connected successfully');
})
.catch((err) => {
    console.log(err);
});

export default mongoose;