import { inject, injectable } from 'inversify';
import { IWarrantyCaseRepository } from 'src/domain/repositories';
import {
  IAdminService,
  IWarrantyCaseService,
  CreateWarrantyCaseDto,
  UpdateWarrantyCaseDto,
} from 'src/domain/services';
import { WarrantyCase } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';

@injectable()
export class WarrantyCaseService implements IWarrantyCaseService {
  constructor(
    @inject(INTERFACE_NAME.WarrantyCaseRepository)
    private warrantyRpository: IWarrantyCaseRepository,
    @inject(INTERFACE_NAME.AdminService)
    private adminService: IAdminService,
  ) {}

  async createWarrantyCase(
    createWarrantyCaseDto: CreateWarrantyCaseDto,
    userId: number,
  ): Promise<WarrantyCase> {
    try {
      const admin = await this.adminService.getAdminByUserId(userId);
      return await this.warrantyRpository.add({ ...createWarrantyCaseDto, adminId: admin.id });
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyCases(): Promise<WarrantyCase[]> {
    try {
      return await this.warrantyRpository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOneWarrantyCase(id: number): Promise<WarrantyCase> {
    try {
      const warrantyCase = await this.warrantyRpository.findById(id);
      if (!warrantyCase) {
        throw new NotFoundError('Warranty case not found');
      }

      return warrantyCase;
    } catch (error) {
      throw error;
    }
  }

  async updateWarrantyCase(
    id: number,
    updateWarrantyCaseDto: UpdateWarrantyCaseDto,
  ): Promise<WarrantyCase> {
    try {
      await this.getOneWarrantyCase(id);
      return await this.warrantyRpository.update(id, updateWarrantyCaseDto);
    } catch (error) {
      throw error;
    }
  }

  async deleteWarrantyCase(id: number): Promise<WarrantyCase> {
    try {
      await this.getOneWarrantyCase(id);
      return await this.warrantyRpository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
