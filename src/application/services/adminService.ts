import { inject, injectable } from 'inversify';
import { IAdminRepository, ICustomerRepository } from 'src/domain/repositories';
import { IAdminService } from 'src/domain/services';
import { Admin } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';

@injectable()
export class AdminService implements IAdminService {
  constructor(@inject(INTERFACE_NAME.AdminRepository) private adminRepository: IAdminRepository) {}

  async createAdmin(userId: number): Promise<Admin> {
    try {
      return await this.adminRepository.add({ userId });
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<Admin[]> {
    try {
      return await this.adminRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Admin | null> {
    try {
      return await this.adminRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId: number): Promise<Admin | null> {
    try {
      return await this.adminRepository.findByUserId(userId);
    } catch (error) {
      throw error;
    }
  }
}
