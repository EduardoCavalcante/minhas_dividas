import mongoose from 'mongoose';

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect('mongodb+srv://joshua:joshua123@minhasdividas-1fbky.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

export default new Database();


