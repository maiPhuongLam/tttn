import { inject, injectable } from 'inversify';
import { IAdminRepository, ICustomerRepository } from 'src/domain/repositories';
import { IAdminService } from 'src/domain/services';
import { Admin } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';

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

  async get(): Promise<Admin[]> {
    try {
      return await this.adminRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getAdminById(id: number): Promise<Admin> {
    try {
      const admin = await this.adminRepository.findById(id);
      if (!admin) {
        throw new NotFoundError(`Admin with id = ${id} not found`);
      }

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByUserId(userId: number): Promise<Admin> {
    try {
      const admin = await this.adminRepository.findByUserId(userId);
      if (!admin) {
        throw new NotFoundError(`Admin with user id = ${userId} not found`);
      }

      return admin;
    } catch (error) {
      throw error;
    }
  }
}
