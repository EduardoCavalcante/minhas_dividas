import  mongoose, { VirtualType }  from 'mongoose';
const Schema = mongoose.Schema;

class User {
    constructor() {
        this.schema = this.createSchema();
    }
    
    createSchema() {
        const schema = new Schema({
            username: { type: String, unique: true, required: true },
            passwordHash: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            createdDate: { type: Date, default: Date.now },
            isAdmin: {type: Boolean, default: false }
        });
        schema.set('toJSON', { virtuals: true });
        return schema;
    }
}

export default mongoose.model('User', new User().schema);