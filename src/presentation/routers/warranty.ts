// warrantyRouter.ts

import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { auth, roles } from '../middlewares';
import { WarrantyController } from '../controllers';

const warrantyRouter = express.Router();
const controller = container.get<WarrantyController>(INTERFACE_NAME.WarrantyController);

warrantyRouter.post(
  '/cases',
  auth,
  roles(['admin']),
  controller.createWarrantyCase.bind(controller),
);
warrantyRouter.get('/cases/:id', auth, roles(['admin']), controller.getOneWarrantyCase.bind(controller));
warrantyRouter.get('/cases', auth, roles(['admin']), controller.getWarrantyCases.bind(controller));
warrantyRouter.patch(
  '/cases/:id',
  auth,
  roles(['admin']),
  controller.updateWarrantyCase.bind(controller),
);
warrantyRouter.delete(
  '/cases/:id',
  auth,
  roles(['admin']),
  controller.deleteWarrantyCase.bind(controller),
);

export default warrantyRouter;
