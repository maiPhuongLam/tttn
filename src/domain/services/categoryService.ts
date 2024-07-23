import { Category } from 'src/infrastructure/database/schemas';
import { CategoryName } from 'src/shared/enums/category';

export type CreateCategoryDto = {
  name: CategoryName;
};
export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  getOneCategory(id: number): Promise<Category>;
  createCategory(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category>;
  updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  deleteCategory(id: number): Promise<Category>;
}
