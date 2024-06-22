// categoryRouter.ts

import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { CategoryController } from '../controllers/categoryController'; // Assuming you have a CategoryController
import { auth, roles } from '../middlewares';

const categoryRouter = express.Router();
const controller = container.get<CategoryController>(INTERFACE_NAME.CategoryController);

categoryRouter.get('/:id', controller.getCategory.bind(controller));
categoryRouter.get('/', controller.getCategories.bind(controller));
categoryRouter.post('/', auth, roles(['admin']), controller.createCategory.bind(controller));
categoryRouter.patch('/:id', auth, roles(['admin']), controller.updateCategory.bind(controller));
categoryRouter.delete('/:id', auth, roles(['admin']), controller.deleteCategory.bind(controller));

export default categoryRouter;
