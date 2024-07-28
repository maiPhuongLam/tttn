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

warrantyRouter.post(
  '/cases',
  auth,
  roles(['admin']),
  controller.addWarrantyPolicy.bind(controller),
);
warrantyRouter.get('/policies/:id', auth, roles(['admin']), controller.getWarrantyPolicy.bind(controller));
warrantyRouter.get('/policies', auth, controller.getWarrantyPolicies.bind(controller));
// warrantyRouter.patch(
//   '/policies/:id',
//   auth,
//   roles(['admin']),
//   controller.updateWarrantyCase.bind(controller),
// );
warrantyRouter.delete(
  '/policies/:id',
  auth,
  roles(['admin']),
  controller.deleteWarrantyPolicy.bind(controller),
);

export default warrantyRouter;
