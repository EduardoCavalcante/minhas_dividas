import Debt from '../models/Debt';
import * as Yup from 'yup';

class DebtController {
    
    async index(req, res) {
        var { userId } = req.body;
        var debts = await Debt.find({ userId });
        return res.json(debts);
    }

    async show(req, res) {
        
    }

    async store( req, res) {

        const schema = Yup.object().shape({
            provider: Yup.number().required(),
            userId: Yup.number().required(),
            paymentDate: Yup.date().required(),
        });

        if (await schema.isValid(req.body) === false) {
            return res.status(400).json({error: 'Validation fails'});
        }
        
        const newDebt = req.body;
        
        await Debt.create(newDebt, (err)=>{
            if (err) return res.status(500).send(err);
        });

        const {id, provider , debtAmount, itsPaid, userId, paymentDate } = newUser;
        
        return res.status(200).json({ id, provider , debtAmount, itsPaid, userId, paymentDate });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            provider: Yup.number().required(),
            userId: Yup.number().required(),
            paymentDate: Yup.date().required(),
        });

        if (await schema.isValid(req.body) === false) {
            return res.status(400).json({error: 'Validation fails'});
        }

        let debtEdited =  req.body;
        
        await debtEdited.save(err => {
                if (err) return res.status(500).send(err);
        });
        const {id, provider , debtAmount, itsPaid, userId, paymentDate } = debtEdited;
        return res.status(200).json({ id, provider , debtAmount, itsPaid, userId, paymentDate });
        
    }

    async destroy (req, res) {
        var {id} = req.body;
        var debt =  await Debt.findOne({_id: id});
        if (debt) {
            debt.remove();
            return res.status(200).json({ message: 'success' });
        }
        return res.status(404).json({ message: 'debt not found' });
    }
}

export default  new DebtController();