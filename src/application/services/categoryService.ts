import { injectable, inject } from 'inversify';
import { ICategoryRepository } from 'src/domain/repositories';
import { IAdminService, ICategoryService } from 'src/domain/services';
import { Category } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(INTERFACE_NAME.CategoryRepository) private categoryRepository: ICategoryRepository,
    @inject(INTERFACE_NAME.AdminService) private adminService: IAdminService,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getOneCategory(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new NotFoundError(`Category with id ${id} not found`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category> {
    try {
      const admin = await this.adminService.getAdminByUserId(userId); // Example: Fetch admin details
      const category = await this.categoryRepository.add({
        ...createCategoryDto,
        adminId: admin.id,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      await this.getOneCategory(id); // Ensure category exists
      const category = await this.categoryRepository.update(id, updateCategoryDto);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: number): Promise<Category> {
    try {
      await this.getOneCategory(id); // Ensure category exists
      const category = await this.categoryRepository.delete(id);
      return category;
    } catch (error) {
      throw error;
    }
  }
}
