import {Router}  from 'express';
import UserController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import DebtController from './app/controllers/DebtController';
import authMiddleware from './app/middlewares/auth';
import allowedMiddleware from './app/middlewares/allowed';
import ProviderController from './app/controllers/ProviderController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.show);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users', UserController.destroy);

routes.get('/debts', DebtController.index);
routes.post('/debts', DebtController.store);
routes.put('/debts/:id', DebtController.update);
routes.delete('/debts', DebtController.destroy);

routes.get('/providers', allowedMiddleware, ProviderController.index);
routes.post('/providers', allowedMiddleware, ProviderController.store);
routes.put('/providers/:id', allowedMiddleware, ProviderController.update);
//routes.delete('/providers', allowedMiddleware, ProviderController.destroy);


export default routes;