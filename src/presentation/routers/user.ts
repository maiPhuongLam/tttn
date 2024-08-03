// userRouter.ts

import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { auth, roles } from '../middlewares';
import { OrderController } from '../controllers';
import { UserController } from '../controllers/userController';

const userRouter = express.Router();
const controller = container.get<UserController>('UserController');

userRouter.get('/:id', controller.getUser.bind(controller));
userRouter.get('/', auth, controller.getAllUsers.bind(controller));
userRouter.delete('/:id', auth, controller.deleteUser.bind(controller));

export default userRouter;
