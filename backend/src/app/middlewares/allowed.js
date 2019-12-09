import User from '../models/Users';

export default async (req, res, next) => {
    var { userId } = req.body;
    const user = User.findById(userId);
    
    if ( !user || !user.isAdmin ) {
      return res.status(401).json( {error: 'User is not admin' });
    }
    return next();
};