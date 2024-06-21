import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { loginSchema, refreshTokenSchema, registerSchema } from 'src/application/dtos';
import { auth, validationResource } from '../middlewares';
import { AuthController } from '../controllers';

const authRouter = express.Router();
const controller = container.get<AuthController>(INTERFACE_NAME.AuthController);

authRouter.post(
  '/register',
  validationResource(registerSchema),
  controller.postResigter.bind(controller),
);
authRouter.post('/login', validationResource(loginSchema), controller.postLogin.bind(controller));
authRouter.post('/logout', auth, controller.postLogout.bind(controller));
authRouter.post(
  '/refresh-token',
  auth,
  validationResource(refreshTokenSchema),
  controller.porstRefreshToken.bind(controller),
);

export default authRouter;
