import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { auth, validationResource } from '../middlewares';
import { AuthController } from '../controllers';
import { loginSchema, refreshTokenSchema, registerSchema } from 'src/application/dtos';

const authRouter = express.Router();
const controller = container.get<AuthController>(INTERFACE_NAME.AuthController);

authRouter.post(
  '/register',
  validationResource(registerSchema),
  controller.resigter.bind(controller),
);
authRouter.post('/login', validationResource(loginSchema), controller.login.bind(controller));
authRouter.post('/logout', auth, controller.logout.bind(controller));
authRouter.post(
  '/refresh-token',
  auth,
  validationResource(refreshTokenSchema),
  controller.refreshToken.bind(controller),
);

export default authRouter;
