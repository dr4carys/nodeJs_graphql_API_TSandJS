import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const connection = mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true,
    keepAlive: true,
    useNewUrlParser: true,
});

connection
    .then((db) => db)
    .catch((err) => {
        console.log(err);
    });

export default connection;
