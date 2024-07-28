import { inject, injectable } from 'inversify';
import { IWarrantyPolicyRepository } from 'src/domain/repositories';
import { CreateWarrantyPolicyDto, IAdminService, IWarrantyPolicyService, updateWarrantyPolicyDto } from 'src/domain/services';
import { WarrantyPolicy } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors'; // Assuming an error class for "Not Found" scenarios

@injectable()
export class WarrantyPolicyService implements IWarrantyPolicyService {
  constructor(
    @inject(INTERFACE_NAME.WarrantyPolicyRepository)
    private warrantyPolicyRepository: IWarrantyPolicyRepository,
    @inject(INTERFACE_NAME.AdminService)
    private adminService: IAdminService,
  ) {}


  async createWarrantyPolicy(createWarrantyPolicyDto: CreateWarrantyPolicyDto, userId: number): Promise<WarrantyPolicy> {
    try {
      const admin = await this.adminService.getAdminByUserId(userId)
      return await this.warrantyPolicyRepository.add({ ...createWarrantyPolicyDto, adminId: admin.id });
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyPolicyById(id: number): Promise<WarrantyPolicy> {
    try {
      const warrantyPolicy = await this.warrantyPolicyRepository.findById(id);
      if (!warrantyPolicy) {
        throw new NotFoundError('Warranty policy not found');
      }
      return warrantyPolicy;
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyPolicyByProductId(productId: number): Promise<WarrantyPolicy[]> {
    try {
      const warrantyPolicies = await this.warrantyPolicyRepository.findByProductId(productId);

      return warrantyPolicies;
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyPolicies(): Promise<WarrantyPolicy[]> {
    try {
      return await this.warrantyPolicyRepository.findAll()
    } catch (error) {
      throw error;
    }
  }

  async updateWarrantyPolicy(
    id: number,
    updateWarrantyPolicyDto: updateWarrantyPolicyDto,
  ): Promise<WarrantyPolicy> {
    try {
      await this.getWarrantyPolicyById(id); // Check if exists before update
      return await this.warrantyPolicyRepository.update(id, updateWarrantyPolicyDto);
    } catch (error) {
      throw error;
    }
  }

  async deleteWarrantyPolicy(id: number): Promise<void> {
    try {
      await this.getWarrantyPolicyById(id); // Check if exists before delete
      await this.warrantyPolicyRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}