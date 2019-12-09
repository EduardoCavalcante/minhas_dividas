import  mongoose, { VirtualType }  from 'mongoose';
const Schema = mongoose.Schema;

class Debts {
    constructor() {
        this.schema = this.createSchema();
    }
    
    createSchema() {
        const schema = new Schema({
            description: { type: String, required: true },
            provider: { type: String, required: true },
            debtAmount: { type: Number,  default: 0},
            itsPaid: { type: Boolean },
            userId: {type: String, required: true},
            paymentDate: { type: Date, required: true }
        });
        return schema;
    }
}

export default mongoose.model('Debt', new Debts().schema);