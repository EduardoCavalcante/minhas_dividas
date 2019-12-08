import {Router}  from 'express';
import UserController from './app/controllers/Users';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
const routes = new Router();

routes.post('/newUser', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.show);
routes.get('/users', UserController.index);
routes.put('/editUser/:id', UserController.update);
routes.delete('/user', UserController.destroy);


export default routes;