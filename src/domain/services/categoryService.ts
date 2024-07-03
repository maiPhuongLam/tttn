import { CreateCategoryDto, UpdateCategoryDto } from 'src/application/dtos';
import { Category } from 'src/infrastructure/database/schemas';

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  getOneCategory(id: number): Promise<Category>;
  createCategory(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category>;
  updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  deleteCategory(id: number): Promise<Category>;
}
