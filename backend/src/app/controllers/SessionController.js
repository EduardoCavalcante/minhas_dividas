import User from '../models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).json({error: 'User not found'});
        }
        
        if ( await bcrypt.compare(password, user.passwordHash) === false) {
            return res.status(401).json({error: 'Password does not match'});
        }

        const { id, firsName, lastName } = user;

        return res.json(
            {
                user : {
                id,
                firsName,
                lastName,
                username
                },
                token: jwt.sign({ id }, authConfig.secret, {expiresIn: authConfig.expiresIn}),
            }
        )

    }
}

export default new SessionController();