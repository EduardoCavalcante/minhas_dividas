import User from '../models/Users';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

class UserController {
    
    async index(req, res) {
        var users = await User.find();
        return res.json(users);
    }

    async show(req, res) {
        var { username } = req.query;
        var user =  await User.findOne({username});

        if(!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        if(user) {
            console.log(user);
            return res.json(user);
        } 
    }

    async store( req, res) {

        const schema = Yup.object().shape({
            username: Yup.string().required(),
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            password: Yup.string().required().min(6),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        });

        if (await schema.isValid(req.body) === false) {
            return res.status(400).json({error: 'Validation fails'});
        }

        const {username} = req.body; 
        const user =  await User.findOne({username});
        if (user) {
            return res.status(400).json({ error: 'user already exists.' });
        }

        const newUser = req.body;
        const { password } = req.body;
        
        if (password) {
            newUser.passwordHash = await bcrypt.hash(password, 8);
        }
        await User.create(newUser, (err)=>{
            if (err) return res.status(500).send(err);
        });

        const {id } = newUser;
        const {firstName } = newUser;
        const {lastName } = newUser;
        return res.status(200).json({id, username, firstName, lastName});
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            username: Yup.string(),
            firstName: Yup.string(),
            lastName: Yup.string(),
            oldPassword: Yup.string().required().min(6),
            password: Yup.string().required().min(6).when('oldPassword', (oldPassword, field) => {
                oldPassword ? field.required() : field
            }),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        });

        if (await schema.isValid(req.body) === false) {
            return res.status(400).json({error: 'Validation fails'});
        }

        const {id} = req.params;
        var user =  await User.findOne({_id: id});
        if (user) {
            const {username, oldPassword, password} = req.body;

            if (username !== user.username) {
                const userExist = await User.findOne({username});
                if (userExist) {
                    return res.status(400).json({ error: 'User already exists.' });
                }
            }

            if (oldPassword) {
                if (await bcrypt.compare(oldPassword, user.passwordHash) === false) {
                    return res.status(401).json({ error: 'Password does not match'});
                }

                if(password && password != oldPassword) {
                    req.body.passwordHash = await bcrypt.hash(password, 8);
                }
            }

            let userEdited = Object.assign(user, req.body);
            
            const {firstName, lastName} = userEdited;
            
            await userEdited.save(err => {
                    if (err) return res.status(500).send(err);
            });
            return res.status(200).json({id, username, firstName, lastName});
        }
        return res.status(404).json({ message: 'user not found'});
    }

    async destroy (req, res) {
        var {id} = req.body;
        var user =  await User.findOne({_id: id});
        if (user) {
            user.remove();
            return res.status(200).json({ message: 'success' });
        }
        return res.status(404).json({ message: 'user not found' });
    }
}

export default  new UserController();