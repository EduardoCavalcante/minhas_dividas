import mongoose from 'mongoose';
import 'dotenv/config';
class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@minhasdividas-1fbky.mongodb.net/test?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

export default new Database();


