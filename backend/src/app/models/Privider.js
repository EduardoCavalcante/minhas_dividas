import  mongoose, { VirtualType }  from 'mongoose';
const Schema = mongoose.Schema;

class Provider {
    constructor() {
        this.schema = this.createSchema();
    }
    
    createSchema() {
        const schema = new Schema({
            name: { type: String, required: true },
            cnpj: { type: String },
            cpf: { type: String },
            type: { type: String, required: true},
        });
        return schema;
    }
}

export default mongoose.model('Provider', new Provider().schema);