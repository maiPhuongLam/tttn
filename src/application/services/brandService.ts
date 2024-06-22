import { injectable, inject } from 'inversify';
import { IBrandRepository } from 'src/domain/repositories';
import { IAdminService, IBrandService } from 'src/domain/services';
import { Brand } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import { CreateBrandDto, UpdateBrandDto } from '../dtos';

@injectable()
export class BrandService implements IBrandService {
  constructor(
    @inject(INTERFACE_NAME.BrandRepository) private brandRepository: IBrandRepository,
    @inject(INTERFACE_NAME.AdminService) private adminService: IAdminService, // Replace with actual service dependency if needed
  ) {}

  async getBrands(): Promise<Brand[]> {
    try {
      const brands = await this.brandRepository.findAll();
      return brands;
    } catch (error) {
      throw error;
    }
  }

  async getOneBrand(id: number): Promise<Brand> {
    try {
      const brand = await this.brandRepository.findById(id);
      if (!brand) {
        throw new NotFoundError(`Brand with id ${id} not found`);
      }
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async createBrand(createBrandDto: CreateBrandDto, userId: number): Promise<Brand> {
    try {
      const admin = await this.adminService.getAdminByUserId(userId); // Example: Fetch admin details
      const brand = await this.brandRepository.add({ ...createBrandDto, adminId: admin.id });
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      await this.getOneBrand(id); // Ensure brand exists
      const brand = await this.brandRepository.update(id, updateBrandDto);
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async deleteBrand(id: number): Promise<Brand> {
    try {
      await this.getOneBrand(id); // Ensure brand exists
      const brand = await this.brandRepository.delete(id);
      return brand;
    } catch (error) {
      throw error;
    }
  }
}
