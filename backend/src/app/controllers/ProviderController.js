import Provider from '../models/Privider';
import * as Yup from 'yup';

class ProviderController {
    
    async index(req, res) {
        var providers = await Provider.find();
        return res.json(providers);
    }


    async store( req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            type: Yup.number().required(),
            cnpj: Yup.string().required().min(6).when('cpf', (cpf, field) => {
                cpf ?  field : field.required()
            }),
            cpf: Yup.string().when('password', (cnpj, field) => {
                cnpj ?  field : field.required()
            })
        });

        if (await schema.isValid(req.body) === false) {
            return res.status(400).json({error: 'Validation fails'});
        }
        
        const newProvider = req.body;
        
        await Provider.create(newProvider, (err)=>{
            if (err) return res.status(500).send(err);
        });

        const { id, name , cnpj, cpf, type } = newProvider;
        
        return res.status(200).json({ id, name , cnpj, cpf, type });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            type: Yup.number().required(),
            cnpj: Yup.string().when('cpf', (cpf, field) => {
                cpf ?  field : field.required()
            }),
            cpf: Yup.string().when('cnpj', (cnpj, field) => {
                cnpj ?  field : field.required()
            })
        });

        if (await schema.isValid(req.body) === false) {
            return res.status(400).json({error: 'Validation fails'});
        }

        let providerEdited =  req.body;
        
        await providerEdited.save(err => {
                if (err) return res.status(500).send(err);
        });
        const {  id, name , cnpj, cpf, type } = providerEdited;
        return res.status(200).json({ id, name , cnpj, cpf, type });
        
    }

    async destroy (req, res) {
        const { id } = req.body;
        const provider =  await Provider.findOne({_id: id});
        if (provider) {
            provider.remove();
            return res.status(200).json({ message: 'success' });
        }
        return res.status(404).json({ message: 'provider not found' });
    }
}

export default  new ProviderController();