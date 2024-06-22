import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { BrandController } from '../controllers/brandController'; // Assuming you have a BrandController
import { auth, roles } from '../middlewares';

const brandRouter = express.Router();
const controller = container.get<BrandController>(INTERFACE_NAME.BrandController);

brandRouter.get('/:id', controller.getBrand.bind(controller));
brandRouter.get('/', controller.getBrands.bind(controller));
brandRouter.post('/', auth, roles(['admin']), controller.createBrand.bind(controller));
brandRouter.patch('/:id', auth, roles(['admin']), controller.updateBrand.bind(controller));
brandRouter.delete('/:id', auth, roles(['admin']), controller.deleteBrand.bind(controller));

export default brandRouter;
